import React, { useState } from "react";
import { api2 } from "../utils/api";
import LogoKost from "../assets/logo_kos_no_bg.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const loginAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await api2.post("/user/login", { email, password });
      const { accessToken, role } = response.data.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", role);
      setErrorMessage("");
      setShowToast(false);
      navigate("/home");
    } catch (error) {
      setErrorMessage("Login gagal. Email atau password salah.");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen w-screen relative flex flex-col sm:flex-row">
      {/* ✅ Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-error text-white shadow-lg">
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Left Panel for Desktop */}
      <div className="hidden sm:flex basis-2/3 bg-gradient-to-b from-[#f9f9f9] to-[#cb857c] text-white items-center justify-center px-10">
        <div className="text-center">
          <div className="rounded-full mx-auto mb-4 flex items-center justify-center">
            <img src={LogoKost} alt="Logo" className="w-60 h-60" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Welcome to</h1>
          <h2 className="text-8xl font-bold mb-4">KostKita</h2>
          <p className="text-sm">Get abundant facilities at low prices</p>
        </div>
      </div>

      {/* Right Panel for Form - Mobile & Desktop */}
      <div className="flex flex-col items-center justify-center px-8 py-10 w-full sm:basis-1/3 bg-white h-screen">
        {/* Mobile: Logo + Welcome Text */}
        <div className="sm:hidden text-center mb-6">
          <img src={LogoKost} alt="Logo" className="w-32 h-32 mx-auto mb-2" />
          <h1 className="text-2xl font-bold">Welcome to KostKita</h1>
        </div>

        {/* Form */}
        <form onSubmit={loginAdmin} className="w-full max-w-md space-y-4">
          <h1 className="text-xl font-bold mb-4 text-center sm:text-left">
            Login
          </h1>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full"
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
  );
};

export default Login;
