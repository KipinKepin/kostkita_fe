import React from "react";
import HeroImage from "../assets/hero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-screen text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HeroImage}
          alt="hero image"
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-7xl font-extrabold loading-tight mb-3 capitalize">
          Book your cozy room
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Get abundant facilities at low prices
        </p>
        <div className="flex gap-5">
          <Link
            to="/room"
            className="bg-[#9c2d41] text-white hover:bg-[#C81737FF] py-2 px-6 md:px-10 text-lg rounded-md font-semibold hover:scale105 hover:shadow-lg"
          >
            Book Now
          </Link>
          <Link
            to="/about"
            className="bg-transparent border border-[#DAA6B0FF] text-white hover:bg-[#DAA6B0FF] rounded-md py-2 px-6 md:px-10 text-lg font-semibold hover:scale105 hover:shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
