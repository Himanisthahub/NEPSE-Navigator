import React, { useState } from "react";
import logo from "../assets/google-logo-on-transparent-white-background-free-vector.jpg";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log form data to the console
    console.log("Form Data Submitted:", formData);

    // Validate input data
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("You must agree to the Terms & Conditions.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert(result.message || "Account created successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });
      } else {
        alert(result.detail || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Failed to create an account. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-1/2 px-16 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Create an Account</h2>
        <p className="mb-6 text-sm text-gray-600">
          Already Have an Account? <a href="#" className="text-blue-500 underline">LOG IN</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-1/2 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-1/2 rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="terms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="mr-2 h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the Terms & Conditions
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Create Account
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="mb-2 text-gray-600">Or login with</p>
          <button
            className="flex items-center justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 font-bold shadow-sm hover:bg-gray-100"
          >
            <img
              src={logo}
              alt="Google"
              className="mr-2 h-5 w-5"
            />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
