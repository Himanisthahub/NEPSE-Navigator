from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://database:dbpassword@userdata.o9orl.mongodb.net/?retryWrites=true&w=majority&appName=userdata"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.userdata
collection_name = db["users"]
