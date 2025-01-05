import { GoogleOAuthProvider } from '@react-oauth/google'; // Import the OAuth provider
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import GetStarted from './getStarted/getstarted';
import LandingPage from './landingpage/landingpage';
import Login from './loginpage/login';
import SignupPage from './signupPage/signupPage';

function App() {
  return (
    // Make sure the GoogleOAuthProvider wraps the entire app or the relevant section
    <GoogleOAuthProvider clientId="886481282340-ua5r107135v0lc58kngkgsb0tvvb2kii.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/landingpage" element={<Login />} /> */}
          <Route path="/landingpage" element={<LandingPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
