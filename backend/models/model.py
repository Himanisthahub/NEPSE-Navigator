import re
import urllib.parse
from threading import Thread

import requests
import torch
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from sentence_transformers import CrossEncoder
from transformers import (AutoModelForCausalLM, AutoTokenizer,
                          TextIteratorStreamer)


class PredictionPipeline:
    def __init__(self):
        self.model_id = "meta-llama/Llama-2-7b-chat-hf"
        self.temperature = 0.3
        self.sentence_transformer_modelname = 'sentence-transformers/all-mpnet-base-v2'
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        print(f"1. Device being utilized: {self.device} ")
    
    def load_model_and_tokenizers(self):
        print("Loading LLaMA-2 model and tokenizer...")
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_id, use_fast=True, model_max_length=4000)
        self.model = AutoModelForCausalLM.from_pretrained(
            self.model_id, torch_dtype=torch.float16, device_map=self.device, trust_remote_code=False
        )
        self.streamer = TextIteratorStreamer(self.tokenizer, skip_prompt=True)
        print(f"LLaMA-2 model ({self.model_id}) successfully loaded!")

    def load_sentence_transformer(self):
        print("🔹 Loading Sentence Transformer model...")
        self.sentence_transformer = HuggingFaceEmbeddings(
            model_name=self.sentence_transformer_modelname,
            model_kwargs={'device': self.device},
        )
        print(" Sentence Transformer model successfully loaded!")

    def load_reranking_model(self):
        print(" Loading reranking model...")
        self.reranker = CrossEncoder("BAAI/bge-reranker-large")
        print("Reranking model successfully loaded!")

    def load_embeddings(self):
        print(" Loading FAISS vector store...")
        try:
            self.vector_db = FAISS.load_local("final_ready_vector_db_data", self.sentence_transformer)
            print(" FAISS vector store successfully loaded!")
        except Exception as e:
            print(f"Error loading FAISS vector store: {e}")

    def rerank_contexts(self, query, contexts, number_of_reranked_documents_to_select=3):
        print("🔹 Reranking retrieved contexts...")
        if not isinstance(contexts, list) or not all(isinstance(ctx, str) for ctx in contexts):
            raise ValueError("contexts must be a list of strings")

        pairs = [(query, ctx) for ctx in contexts]
        similarity = self.reranker.predict(pairs)

        highest_ranked_indices = sorted(
            range(len(similarity)), key=lambda i: similarity[i], reverse=True
        )[:number_of_reranked_documents_to_select]

        print("Contexts reranked successfully!")
        return [contexts[index] for index in highest_ranked_indices]

    def is_text_nepali(self, text):
        print("🔹 Checking if the input text is Nepali...")
        nepali_regex = re.compile(r'[\u0900-\u097F]+')
        result = bool(nepali_regex.search(text))
        print(f"Nepali text detected: {result}")
        return result

    def translate_using_google_api(self, text, source_language="auto", target_language="ne", timeout=5):
        print(f"🔹 Translating text from {source_language} to {target_language}...")
        pattern = r'(?s)class="(?:t0|result-container)">(.*?)<'
        escaped_text = urllib.parse.quote(text.encode('utf8'))
        url = f'https://translate.google.com/m?tl={target_language}&sl={source_language}&q={escaped_text}'
        response = requests.get(url, timeout=timeout)
        result = re.findall(pattern, response.text)
        translated_text = result[0] if result else text
        print(f"Translation completed: {translated_text[:50]}...")  # Print first 50 characters
        return translated_text

    def perform_translation(self, question, source_language, target_language):
        print("Performing translation...")
        try:
            translation = self.translate_using_google_api(question, source_language, target_language)
            print("Translation successful!")
            return translation
        except Exception as e:
            print(f"Error in translation: {e}")
            return f"An error occurred, [{e}], while working with Google Translation API"

    def make_predictions(self, question, top_n_values=10):
        print(f"🔹 Processing question: {question}")

        is_original_language_nepali = self.is_text_nepali(question)
        if is_original_language_nepali:
            question = self.perform_translation(question, 'ne', 'en')
            print("✅ Translated Question:", question)

        print("🔹 Performing FAISS similarity search...")
        similarity_search = self.vector_db.similarity_search_with_score(question, k=top_n_values)
        context = [doc.page_content for doc, score in similarity_search if score < 1.5]

        if not context:
            print("No relevant context found. Unable to answer.")
            yield "data: Unable to answer this question as it is outside domain knowledge.\n\n"
            return

        print(f"Retrieved {len(context)} context(s) from FAISS search.")
        context = self.rerank_contexts(question, context) if len(context) > 1 else context
        context = ". ".join(context)

        print("🔹 Constructing prompt for LLaMA-2...")
        prompt = f'''
        Based solely on the information given in the context above, answer the following question.
        Never answer a question in your own words outside of the context provided.
        If the information isn’t available, say "Sorry, I don’t have knowledge about that topic."
        Answer in max five sentences (<100 words).
        Question: {question}\n\n
        Context: {context}\n\n
        Answer:
        '''
        
        print("Prompt constructed successfully!")
        print("Generating response with LLaMA-2...")

        inputs = self.tokenizer([prompt], return_tensors="pt").to("cuda")
        generation_kwargs = dict(
            inputs,
            streamer=self.streamer,
            max_new_tokens=2000,
            do_sample=True,
            temperature=0.3,
            top_p=0.95,
            top_k=40,
            repetition_penalty=1.1,
            pad_token_id=50256
        )
        
        thread = Thread(target=self.model.generate, kwargs=generation_kwargs)
        thread.start()

        for token in self.streamer:
            if is_original_language_nepali:
                token = self.translate_using_google_api(token, "en", "ne")
            yield f"data: {token}\n\n"

        thread.join()
        print("Response generation completed!")
        yield "data: END\n\n"
