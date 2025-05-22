import React from "react";
import HeroImage from "../assets/hero.jpg";

const HeaderSection = ({ title, subtitle }) => {
  return (
    <header className="relative h-60 text-white overflow-hidden pt-10">
      <div className="absolute inset-0">
        <img
          src={HeroImage}
          alt="header image"
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative flex flex-col justify-center items-center h-g0 text-center pt-14">
        <h1 className="text-5xl font-bold leading-tight capitalize">{title}</h1>
        <p className="text-xl text-gray-300">{subtitle}</p>
      </div>
    </header>
  );
};

export default HeaderSection;
