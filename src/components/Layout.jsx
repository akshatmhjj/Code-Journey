import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  // Paths where Header and Footer should be hidden
  const noHeaderFooterRoutes = ["/login", "/register", "/verify-otp", "/profile"];

  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow m-0 p-0">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default Layout;
