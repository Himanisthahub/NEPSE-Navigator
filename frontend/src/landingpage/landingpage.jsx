import React from "react";

function App() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-white flex flex-col items-center border-r p-4">
        <div className="text-xl font-bold mb-10">SCSE Insights</div>
        <ul className="w-full space-y-4 mb-10">
          <li className="h-8 bg-gray-200 rounded"></li>
          <li className="h-8 bg-gray-200 rounded"></li>
          <li className="h-8 bg-gray-200 rounded"></li>
          <li className="h-8 bg-gray-200 rounded"></li>
        </ul>
        <div className="bg-blue-900 text-white text-center p-4 rounded w-full">
          <h3 className="text-lg font-bold mb-2">Premium Plan</h3>
          <p>Technical Analysis</p>
          <p>Stock Comparison</p>
          <p>Visualizations</p>
          <button className="bg-blue-700 hover:bg-blue-600 mt-4 px-4 py-2 rounded">
            Buy Now!
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white flex flex-col items-center justify-center p-4">
        <div className="w-4/5 flex flex-col">
          <div className="flex-1 bg-gray-100 rounded p-6 flex justify-center items-center mb-4">
            <p>Your chat messages will appear here</p>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Write your message"
              className="flex-1 px-4 py-2 border rounded"
            />
            <button className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Send
            </button>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="w-1/5 bg-blue-900 text-white flex flex-col items-center p-4">
        <h3 className="text-lg font-bold mb-4">History</h3>
        <ul className="w-full space-y-4">
          <li className="h-8 bg-blue-700 rounded"></li>
          <li className="h-8 bg-blue-700 rounded"></li>
          <li className="h-8 bg-blue-700 rounded"></li>
          <li className="h-8 bg-blue-700 rounded"></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
