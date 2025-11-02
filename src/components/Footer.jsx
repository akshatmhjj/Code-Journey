import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#121124] text-white py-16 px-8 lg:px-24 font-sans z-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between space-y-12 md:space-y-0">
        <div className="w-full md:w-2/5 pr-0 md:pr-12">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-wide mb-8">
            CODE <br />
            JOURNEY <br />
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-white border-2 border-[#5C94FF] cursor-pointer px-6 py-3 rounded-lg font-semibold tracking-wide transition-shadow duration-300 ease-in-out hover:shadow-[0_8px_15px_rgba(92,148,255,0.5)]"
          >
            Start your Web Dev Journey
          </button>
        </div>
        <div className="w-full md:w-3/5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h2 className="text-gray-400 font-bold mb-4">Platform</h2>
              <ul className="space-y-3 text-gray-300">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/tech-stack" className="hover:text-white transition-colors">Tech Stack</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Company</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-gray-400 font-bold mb-4">Resources</h2>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
                <li><a href="/Faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-gray-400 font-bold mb-4">Legals</h2>
              <ul className="space-y-3 text-gray-300">
                <li><a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/licensing" className="hover:text-white transition-colors">Licensing</a></li>
              </ul>
            </div>
          </div>
          <hr className="my-10 border-gray-700" />
          <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <h2 className="text-gray-400 font-bold sm:mr-4">Follow us on:</h2>
            <div className="flex space-x-4 text-gray-500">
              <a href="#" className="hover:text-white transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><FaFacebookF size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><FaInstagram size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
