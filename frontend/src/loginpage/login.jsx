import React from 'react';
import googleLogo from "../assets/google-logo-on-transparent-white-background-free-vector.jpg";
import logo from "../assets/money.png"; // Replace with the actual path to your NEPSE Navigator logo

const LoginPage = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center">
        <img
          src={logo}
          alt="NEPSE Navigator Logo"
          className="w-20 h-20 mb-4"
        />
        <div className="text-4xl font-bold text-blue-900 mb-4 text-center">
          Navigating the Nepal Stock Exchange with Ease
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-blue-900 flex flex-col justify-center items-center">
        <div className="text-white text-3xl font-semibold mb-4">Welcome Back!</div>
        <p className="text-white text-sm mb-6">Please Enter Your Details</p>
        <form className="w-3/4 flex flex-col gap-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-white text-blue-900 rounded-lg outline-none"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-white text-blue-900 rounded-lg outline-none"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-white text-blue-900 font-bold text-lg rounded-lg hover:bg-gray-100"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center justify-between text-white text-sm my-4">
            <span className="w-1/4 border-b border-white"></span>
            <span>Or login with</span>
            <span className="w-1/4 border-b border-white"></span>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-blue-900 font-bold text-lg rounded-lg hover:bg-gray-100"
          >
            <img
              src={googleLogo}
              alt="Google Logo"
              className="w-5 h-5"
            />
            Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
