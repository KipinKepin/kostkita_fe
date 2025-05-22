import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="antialiased">
      <Navbar />
      <main className="bg-gray-50">{children}</main>
    </div>
  );
};

export default Layout;
