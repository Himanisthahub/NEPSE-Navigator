import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../assets/logoutt.png";
import logo from "../assets/money.png";

const LandingPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // Handle sending a new message
  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { user: true, text: input }]);
      setMessages((prev) => [...prev, { user: false, text: "AI response..." }]);
      setInput("");
    }
  };

  return (
    <div
      className="h-screen flex flex-col font-sans" // Apply font globally here
      style={{ fontFamily: "Abel, sans-serif" }} // Ensure same font is used everywhere
    >
      {/* Header Section */}
      <div className="bg-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Nepse Navigator Logo"
            className="w-8 h-8 mr-2"
          />
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
            style={{
              height: "67px",
              borderRadius: "16px",
            }}
          >
            Upgrade to Premium
          </button>

          {/* Log Out Button */}
          <div
            className="flex justify-center mt-auto"
            style={{ marginBottom: "16px" }}
          >
            <button
              className="flex items-center justify-center bg-customBlue text-white rounded-md"
              style={{
                width: "195px",
                height: "67px",
                borderRadius: "16px",
              }}
              onClick={() => navigate("/get-started")}
            >
              <img
                src={logoutIcon}
                alt="Log Out Icon"
                className="w-6 h-6 mr-2"
              />
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
