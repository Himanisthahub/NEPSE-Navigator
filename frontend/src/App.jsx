import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { Route, Routes } from "react-router-dom";

import GetStarted from "./getStarted/getstarted";
import LandingPage from "./landingpage/landingpage";
import Login from "./loginpage/login";
import Profile from "./profile/profile"; // Capitalized component
import SignupPage from "./signupPage/signupPage";
import TermsAndConditions from "./terms/terms";

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
