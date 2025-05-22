import React from "react";
import { Link, NavLink } from "react-router-dom";
import LogoKost from "../assets/logo_kos.jpg";
import Navlink from "./Navlink";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-20">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-2">
        <a href="/home" className="flex items-center font-bold">
          <img src={LogoKost} width={50} height={50} alt="logo" />
          <p className="text-2xl">KostKita</p>
        </a>
        <Navlink />
      </div>
    </div>
  );
};

export default Navbar;
