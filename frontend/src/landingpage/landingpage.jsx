import React from "react";

function App() {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <header className="flex items-center justify-between p-4 border-b border-gray-300">
        <div className="flex items-center">
          <img
            src="logo" // Replace with your logo path
            alt="NEPSE-Navigator Logo"
            className="w-8 h-8"
          />
          <span className="ml-2 text-sm font-semibold">NEPSE Navigator</span>
        </div>
        <div className="relative">
          <img
            src="/profile.jpg" // Replace with the user's profile picture path
            alt="User Profile"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
          {/* Hover Content */}
          <div className="absolute top-full right-0 hidden bg-white border border-gray-300 shadow-md">Profile Details</div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar */}
        <aside className="w-1/4 p-4 border-r border-gray-300">
          <div className="bg-blue-800 text-white p-4 rounded-md">
            <h2 className="text-lg font-bold">Premium Plan</h2>
            <ul className="mt-2 text-sm">
              <li>Technical Analysis</li>
              <li>Stock Comparison</li>
              <li>Translation</li>
            </ul>
            <button
              className="mt-4 bg-white text-blue-800 px-4 py-2 rounded-md"
              onClick={() => window.location.href = "/premium-plan"}
            >
              Buy Now!!
            </button>
          </div>

          <button
            className="mt-4 flex items-center bg-blue-800 text-white px-4 py-2 rounded-md"
            onClick={() => window.location.href = "/get-started"}
          >
            <span>Log Out</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 10h6"
              />
            </svg>
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center p-4">
          <div className="w-full flex-1 bg-gray-100 p-4 rounded-lg shadow-md">
            {/* Chat Messages */}
            <div className="flex flex-col space-y-4">
              <div className="self-start bg-blue-200 p-4 rounded-lg">User's message</div>
              <div className="self-end bg-gray-300 p-4 rounded-lg">AI's response</div>
            </div>

            {/* Actions for AI Response */}
            <div className="mt-2 flex space-x-4">
              <button className="text-green-500">👍</button>
              <button className="text-red-500">👎</button>
              <button className="text-blue-500">📋 Copy</button>
            </div>
          </div>

          {/* Message Input */}
          <div className="mt-4 w-full flex items-center">
            <input
              type="text"
              placeholder="Write your message"
              className="flex-1 px-4 py-2 border rounded-full shadow-md"
            />
            <button
              className="ml-2 p-2 bg-blue-800 text-white rounded-full"
              onClick={() => console.log("Send Message")}
            >
              ⬆️
            </button>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-1/4 bg-blue-800 text-white p-4">
          <h2 className="font-semibold">History</h2>
          {/* Add history items */}
          <ul className="mt-2 space-y-2">
            <li>History Item 1</li>
            <li>History Item 2</li>
            <li>History Item 3</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default App;
