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
import JavaScript from './pages/JavaScript';
import DatabasePage from './pages/Database';
import CJEditor from './pages/CJEditor';
import CJEditorLanding from './pages/CJEditorLanding';
import ChatPage from './pages/ChatPage';
import CJAILanding from './pages/CJAILanding';
import ProtectedRoute from "./route/ProtectedRoute";
import BadgesHall from "./pages/BadgesHall";

import { BadgeProvider } from "./context/BadgeContext";
import BadgeUnlockModal from "./components/BadgeUnlockModal";
import { useAuth } from "./context/AuthContext";

function AppWrapper() {
  const { user } = useAuth();

  return <App currentUser={user} />;
}

function App({ currentUser }) {
  return (
    <Router>
      <ScrollToTop />

      <BadgeProvider currentUser={currentUser}>

        <BadgeUnlockModal />

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
            <Route path="/javascript" element={<JavaScript />} />
            <Route path="/database" element={<DatabasePage />} />
            <Route
              path="/cjeditor"
              element={
                <ProtectedRoute>
                  <CJEditor />
                </ProtectedRoute>
              }
            />
            <Route path="/code-journey-editor" element={<CJEditorLanding />} />
            <Route
              path="/cj-ai"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
            <Route path="/code-journey-ai" element={<CJAILanding />} />
            <Route
              path="/badges"
              element={
                <ProtectedRoute>
                  <BadgesHall />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>

      </BadgeProvider>
    </Router>
  );
}

export default AppWrapper;
