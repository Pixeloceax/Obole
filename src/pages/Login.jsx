import React from "react";
import logo from "../assets/Logo_white_bg_gray.png";
import "../styles/index.css";

const Login = () => {
  return (
    <div className="md:min-h-screen flex items-center justify-center bg-gray-100">
      <div className="md:max-w-lg md:w-[80%] md:space-y-8">
        <div className="bg-black sm:p-20 p-10 pt-20 md:rounded-3xl h-screen md:h-fit md:w-fit w-screen">
          <div className="flex justify-center">
            <img className="" src={logo} alt="logo" />
          </div>
          <div>
            <h2 className="text-center text-3xl font-extrabold text-white">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6">
            <div className="justify-center md:p-0 p-5">
              <div className="mb-5">
                <input
                  id="compteNumber"
                  name="compteNumber"
                  type="number"
                  autoComplete="compteNumber"
                  required
                  className="input appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                  placeholder="Numero de Compte"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="input appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                  placeholder="Mots De Passe"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-white"
                >
                  Remember me
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
