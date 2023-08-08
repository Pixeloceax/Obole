import { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/Logo_white_bg_gray.png";

import jwtDecode from "jwt-decode";

const Login = ({ handleLogin }) => {
  const [message, setMessage] = useState("");

  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataJSON = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formDataJSON
      );

      if (
        response.status === 200 &&
        response.data.message === "Login successful"
      ) {
        const token = response.data.token;
        const _id = response.data._id;

        if (!isTokenExpired(token)) {
          localStorage.setItem("token", token);
          sessionStorage.setItem("_id", _id);
          handleLogin();
        } else {
          setMessage("Token expired");
        }
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error(error);
      console.log(error.response);
      setMessage("An error occurred while logging in.");
    }
  };

  useEffect(() => {
    setMessage("");
  }, []);

  return (
    <div className="md:min-h-screen flex items-center justify-center bg-white">
      <div className="md:max-w-lg md:w-[80%] md:space-y-8">
        <div className="bg-black sm:p-20 p-10 py-32 md:rounded-3xl md:h-fit sm:h-screen h-fit md:w-fit w-screen">
          <div className="flex justify-center">
            <img className="" src={logo} alt="logo" />
          </div>
          <div>
            <h2 className="text-center text-3xl font-extrabold text-white">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <div className="justify-center md:p-0 p-5">
              <div className="mb-5">
                <input
                  id="accountNumber"
                  name="accountNumber"
                  type="number"
                  autoComplete="accountNumber"
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
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
          {message && (
            <div className="text-center text-red-500 mt-2">{message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
