import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/AboutUs';
import Faq from './pages/FAQ';
import Terms from './pages/T&C';
import Licensing from './pages/Licensing';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOtp from './pages/OtpVerification';
import Profile from './pages/Profile';
import ScrollToTop from './components/ScrollToTop';
import HTML from './pages/Html';
import CSS from './pages/Css';
import TechStack from './pages/TechStack';

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/licensing" element={<Licensing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/html" element={<HTML />} />
          <Route path="/css" element={<CSS />} />
          <Route path="/tech-stack" element={<TechStack />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
