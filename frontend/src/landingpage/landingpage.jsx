import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // Handle sending a new message
  const handleSend = () => {
    if (input.trim()) {
      // Add user message
      setMessages((prev) => [...prev, { user: true, text: input }]);
      // Add placeholder AI response (replace with actual AI integration)
      setMessages((prev) => [...prev, { user: false, text: "AI response..." }]);
      setInput("");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-gray-200 px-4 py-2 flex items-center justify-between">
        <h1 className="text-lg font-bold">NEPSE-Navigator</h1>
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
        <div className="w-1/4 bg-gray-100 p-4">
          {/* Premium Card Design */}
          <div
            className="w-[259px] h-[331px] bg-white shadow-md rounded-lg border border-gray-300 p-4 flex flex-col items-center"
            style={{ fontFamily: "Aboreto, sans-serif" }}
          >
            <h2 className="text-[36px] font-regular text-customBlue mb-2">
              PREMIUM
            </h2>
            <div className="text-[34px] text-customBlue mb-1">1000RS</div>
            <div
              className="text-[14px] text-gray-500 mb-4"
              style={{ fontFamily: "Abel, sans-serif" }}
            >
              /month
            </div>
            <p className="text-[13px] text-gray-700 text-center mb-6">
              Unlock the Future of Trading: <br />
              Upgrade to Premium on Nepse Navigator Now
            </p>
            <ul className="text-[10px] text-gray-700 space-y-2 mb-6">
              <li className="flex items-center">
                <div
                  className="w-4 h-4 bg-customBlue rounded-full flex items-center justify-center text-white mr-2"
                >
                  ✓
                </div>
                Stock Comparison
              </li>
              <li className="flex items-center">
                <div
                  className="w-4 h-4 bg-customBlue rounded-full flex items-center justify-center text-white mr-2"
                >
                  ✓
                </div>
                Technical Analysis
              </li>
              <li className="flex items-center">
                <div
                  className="w-4 h-4 bg-customBlue rounded-full flex items-center justify-center text-white mr-2"
                >
                  ✓
                </div>
                Stock Comparison
              </li>
            </ul>
            <button
              onClick={() => navigate("/premium")}
              className="w-full bg-customBlue text-white py-2 rounded-md hover:bg-customBlue-dark"
              style={{ fontFamily: "Abel, sans-serif" }}
            >
              Upgrade to Premium
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
