import React, { useState } from "react";
import { api2 } from "../utils/api";
import LogoKost from "../assets/logo_kos_no_bg.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await api2.post("/user/login", { email, password });
      console.log(response);
      const { accessToken, role } = response.data.data;
      console.log(response.data.data);
      console.log(accessToken);
      console.log(role);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", role);
      navigate("/home");
    } catch (error) {
      console.error("Tidak dapat login");
    }
  };

  return (
    <div className="min-h-screen flex w-screen">
      {/* Left Panel */}
      <div className="basis-2/3 bg-gradient-to-b from-[#f9f9f9] to-[#cb857c] text-white flex flex-col items-center justify-center px-10">
        <div className="text-center">
          <div className="rounded-full mx-auto mb-4 flex items-center justify-center">
            <img src={LogoKost} alt="Logo" className="w-60 h-60" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome to</h1>
          <h2 className="text-8xl font-bold mb-4">KostKita</h2>
          <p className="text-sm">Get abundant facilities at low prices</p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="basis-1/3 bg-white">
        <div className="h-full min-h-screen flex items-center justify-center px-10 w-full">
          <form
            onSubmit={loginAdmin}
            className="w-full max-w-md space-y-4 items-center justify-center"
          >
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />

            <button
              type="submit"
              className="bg-[#9c2d41] hover:bg-[#C81737FF] text-white p-2 w-full rounded cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
