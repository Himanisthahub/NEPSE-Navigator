import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin component
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import logo from "../assets/money.png";

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

      // Extract Google credential (the token sent by Google)
      const googleToken = credentialResponse?.credential;

      if (googleToken) {
        const data = { credential: googleToken }; // Send the Google token to the backend

        console.log("Data being sent to backend (Google login):", data);

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
          navigate("/landingpage"); // Redirect to landing page
        } else {
          setError("Google login failed");
        }
      } else {
        setError("Google login failed. Token not found.");
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
        <div className="text-4xl font-bold text-customBlue mb-4 text-center">
          Navigating the Nepal Stock Exchange with Ease
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-customBlue flex flex-col justify-center items-center">
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
            className="w-full px-4 py-2 bg-white text-customBlue rounded-lg outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-white text-customBlue rounded-lg outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Login
          </button>
        </form>

        <div className="text-white mt-4">Or Login With</div>

        {/* Google Login */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setError("Google login failed")}
        />
      </div>
    </div>
  );
};

export default LoginPage;
