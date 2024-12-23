import React from 'react';
import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center">
        <div className="text-4xl font-bold text-blue-900 mb-4">
          Navigating the Nepal Stock Exchange with Ease
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-blue-900 flex flex-col justify-center items-center">
        <div className="text-white text-3xl font-semibold mb-8">Get Started</div>
        <div className="flex flex-col gap-4">
          {/* <Link className="w-40 py-2 bg-white text-blue-900 font-medium rounded-lg hover:bg-gray-100">Sign up</Link> */}
          <Link to="/login"  className="w-40  px-12 py-2 bg-white text-blue-900 font-medium rounded-lg hover:bg-gray-100 ">Login</Link>
          <Link to="/Signup"  className="w-40 px-10 py-2 bg-white text-blue-900 font-medium rounded-lg hover:bg-gray-100 ">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;