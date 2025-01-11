import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import GetStarted from './getStarted/getstarted';
import LandingPage from './landingpage/landingpage';
import Login from './loginpage/login';
import SignupPage from './signupPage/signupPage';

function App() {
  return (
    <GoogleOAuthProvider clientId="886481282340-ua5r107135v0lc58kngkgsb0tvvb2kii.apps.googleusercontent.com">
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
