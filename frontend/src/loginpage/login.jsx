import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin component
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import logo from "../assets/money.png"; // Replace with the actual path to your NEPSE Navigator logo

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle input changes for login form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Reusable function to handle login
  const handleLogin = async (data) => {
    try {
      console.log("Data being sent to backend:", data); // Print data sent to backend
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Backend Response:", result); // Print backend response
        localStorage.setItem("access_token", result.access_token);

        // Redirect to landing page
        navigate("/landingpage");
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  // Handle manual login submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({
      email: loginData.email,
      password: loginData.password,
    });
  };

  // Handle Google login response
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      console.log("Google credential response:", credentialResponse);

      // Extract email from Google response
      const googleEmail = credentialResponse?.credential?.email;
      
      if (googleEmail) {
        const data = {
          email: googleEmail,  // Send email from Google login
          password: "google_oauth_placeholder",  // Set a placeholder for password as Google login doesn't require one
        };

        // Print Google login data in the same format as manual login
        console.log("Data being sent to backend (Google login):", { email: googleEmail, password: "google_oauth_placeholder" });

        const response = await fetch("http://localhost:8000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Backend Response:", result);
          localStorage.setItem("access_token", result.access_token);
          navigate("/landingpage"); // Redirect to the landing page
        } else {
          setError("Google login failed");
        }
      } else {
        setError("Google login failed. Email not found.");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      setError("An error occurred during Google login. Please try again later.");
    }
  };

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

        {/* Display error if any */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="w-3/4 flex flex-col gap-4">
          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white text-blue-900 rounded-lg outline-none"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white text-blue-900 rounded-lg outline-none"
            required
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
          <GoogleLogin
            onSuccess={handleGoogleLogin} // Handle Google login success
            onError={() => {
              console.log("Google Login Failed");
              setError("Google login failed. Please try again.");
            }}
            useOneTap // Optional: for one-tap login
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
