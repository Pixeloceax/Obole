import React, { useState, useEffect } from "react";

// Import dependencies
import axios from "axios";

// Import assets
import logo from "../assets/Logo_white_bg_gray.png";

const Register = () => {
  const [message, setMessage] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataJSON = Object.fromEntries(formData.entries());

    const response = await axios.post(
      "https://obole-back.onrender.com/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataJSON),
      }
    );

    const data = await response.json();
    if (data.message === "User Created Successfully") {
      window.location.href = "/login";
    }
    if (data.message === "Email already exists") {
      document.querySelector("#email").classList.add("border-red-500");
      document.querySelector("#alert").classList.remove("hidden");
    }
  };

  useEffect(() => {
    setMessage("");
  }, []);
  return (
    <div className="md:min-h-screen flex items-center justify-center bg-white">
      <div className="">
        <div className="bg-black sm:p-20 sm:pt-[3vw] p-10 pt-10 md:rounded-3xl h-fit md:h-[90vh] md:w-[70vh] w-screen">
          <div className="flex justify-center">
            <img className="h-[15rem] md:h-fit" src={logo} alt="logo" />
          </div>
          <div>
            <h2 className="text-center text-3xl font-extrabold text-white">
              Register
            </h2>
          </div>
          <form
            className="md:mt-2 mt-0 md:space-y-8 space-y-2"
            onSubmit={handleFormSubmit}
          >
            <div className="md:flex justify-center">
              <div className="justify-center md:p-0 p-5">
                <div className="mb-5">
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    autocomplete="nom"
                    required
                    className="input appearance-none relative block w-full px-3 mr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholder="Nom"
                  />
                </div>
                <div>
                  <input
                    id="prenom"
                    name="prenom"
                    type="text"
                    autocomplete="prenom"
                    required
                    className="input appearance-none relative block w-full px-3 mr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholder="Prenom"
                  />
                </div>
                <div className="mt-5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    className="input appearance-none relative block w-full px-3 mr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholder="Email"
                  />
                </div>
                <div className="h-2 pt-2">
                  <div id="alert" className="text-red-500 text-center hidden">
                    L'email est deja utiliser
                  </div>
                </div>
              </div>
              <div className="justify-center md:p-0 p-5 md:ml-5">
                <div className="mb-5">
                  <input
                    id="adresse"
                    name="adresse"
                    type="text"
                    autocomplete="adresse"
                    required
                    className="input appearance-none relative block w-full px-3 mr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholder="Adresse"
                  />
                </div>
                <div>
                  <input
                    id="tel"
                    name="tel"
                    type="tel"
                    autocomplete="tel"
                    required
                    className="input appearance-none relative block w-full px-3 mr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholder="Numéro de téléphone"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center text-white justify-center">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="genre"
                  value="male"
                />
                <span className="ml-2">Homme</span>
              </label>
              <label className="inline-flex items-center ml-12">
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="genre"
                  value="female"
                />
                <span className="ml-2">Femme</span>
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
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

export default Register;
