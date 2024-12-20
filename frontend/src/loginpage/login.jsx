// eslint-disable-next-line no-unused-vars
import React from 'react';
import './login.css';

const Login  = () => {
  return (
    <div className="container">
      {/* Left Section */}
      <div className="left-section">
        <h1 className="slogan">Navigating the Nepal Stock Exchange with Ease</h1>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="white-box">
          <h1 className="welcome-text">Welcome Back!</h1>
          <p className="sub-text">Please Enter Your Details</p>
          <form className="form">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="input-line"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="input-line"
                required
              />
            </div>
            <button type="submit" className="button">Login</button>
          </form>
          <p className="or-login-text">Or login with</p>
          <button className="google-button">
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google Logo"
              className="google-logo"
            />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
