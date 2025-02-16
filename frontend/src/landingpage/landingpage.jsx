import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../assets/logoutt.png";
import logo from "../assets/money.png";

const LandingPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle sending a new message
  const handleSend = async () => {
    if (!input.trim()) return;

    // Append user message to chat
    setMessages((prev) => [...prev, { user: true, text: input }]);

    // Show loading state
    setLoading(true);

    try {
      // Send query to FastAPI backend
      const response = await axios.post("http://127.0.0.1:8000/ask", { question: input });

      // Append AI response to chat
      setMessages((prev) => [...prev, { user: false, text: response.data.response }]);
      
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { user: false, text: "Failed to get AI response" }]);
      
    } finally {
      // Remove loading state
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="h-screen flex flex-col font-sans">
      {/* Header Section */}
      <div className="bg-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Nepse Navigator Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-lg font-bold">NEPSE-Navigator</h1>
        </div>
        <div
          className="w-10 h-10 bg-customBlue text-white rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => navigate("/profile")} 
        >
          P
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-grow">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-gray-100 p-4 flex flex-col justify-between">
          <button
            onClick={() => navigate("/premium")}
            className="w-full bg-customBlue text-white py-2 rounded-md hover:bg-customBlue-dark"
          >
            Upgrade to Premium
          </button>

          {/* Log Out Button */}
          <div className="flex justify-center mt-auto">
            <button
              className="flex items-center justify-center bg-customBlue text-white rounded-md"
              onClick={() => navigate("/get-started")}
            >
              <img src={logoutIcon} alt="Log Out Icon" className="w-6 h-6 mr-2" />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </div>

        {/* Chat Section */}
        <div className="flex-grow flex flex-col bg-gray-200">
          {/* Chat Messages */}
          <div className="flex-grow p-4 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md max-w-xs ${
                  msg.user
                    ? "bg-customBlue text-white self-end"
                    : "bg-gray-300 text-black self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && <div className="text-gray-500">Loading...</div>}
          </div>

          {/* Input Section */}
          <div className="p-4 flex gap-2 border-t border-gray-300 bg-gray-100">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your message..."
              className="flex-grow border border-gray-300 p-2 rounded-md"
            />
            <button
              onClick={handleSend}
              className="bg-customBlue text-white px-4 py-2 rounded-md hover:bg-customBlue-dark"
            >
              Send
            </button>
          </div>
        </div>

        {/* Right Sidebar - History */}
        <div className="w-1/4 bg-customBlue text-white p-4">
          <h2 className="text-lg font-bold mb-4">History</h2>
          <div className="space-y-2">
            {messages
              .filter((msg) => msg.user)
              .map((msg, idx) => (
                <div key={idx} className="bg-customBlue-dark p-2 rounded-md">
                  {msg.text}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
