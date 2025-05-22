import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Main from "../components/Main";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <div>
      <Layout />
      <Hero />
      <div className="mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">Room & Rates</h1>
          <p className="py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque,
            quod.
          </p>
        </div>
        <Main />
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
