import React from "react";
import { useState } from "react";
import {signin} from '../assets'
import { useAuth } from "../services/AuthContex";
import { Navbar, Footer } from "../components"

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login işlemleri burada yapılacak
    console.log(loginData);
    login(loginData.username, loginData.password)
  };

  return (
    <div className="w-full flex flex-col justify-between min-h-screen">
      <Navbar/>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${signin})` // Arka plan görselini değiştirebilirsiniz
        }}
      >
        <div className="bg-[#E1D7C6] bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#295F98]">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className=" text-sm font-medium text-[#295F98]">Username</label>
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleChange}
                className="mt-1 w-full p-2 border text-[#295F98] rounded-md"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-[#295F98]">Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="mt-1 w-full p-2 border text-[#295F98] rounded-md"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
