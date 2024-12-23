import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import GetStarted from './getStarted/getstarted';
import Login from './loginpage/login';
import SignupPage from './signupPage/signupPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;