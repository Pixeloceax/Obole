import React from 'react';
import logo from "../assets/Logo_white_bg_gray.png";
import "../styles/index.css";

const Register = () => {
  return (
    <div className="md:min-h-screen flex items-center justify-center bg-gray-100">
      <div className="">
        <div className="bg-black sm:p-20 p-10 pt-20 md:rounded-3xl h-screen md:h-[90vh] md:w-[70vh] w-screen">
          <div className="flex justify-center">
            <img className="" src={logo} alt="logo" />
          </div>
          <div>
            <h2 className="text-center text-3xl font-extrabold text-white">
              Register
            </h2>
          </div>
          <form className="mt-8 space-y-9">
            <div class="flex justify-center">
              <div class="justify-center md:p-0 p-5">
                <div class="mb-5">
                  <input
                    id="nom"
                    name="nom"
                    type="text"
                    autocomplete="nom"
                    required
                    class="input appearance-none relative block w-full px-3 pr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
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
                    class="input appearance-none relative block w-full px-3 pr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholder="Prenom"
                  />
                </div>
              </div>
              <div class="justify-center md:p-0 p-5 ml-5">
                <div class="mb-5">
                  <input
                    id="adresse"
                    name="adresse"
                    type="text"
                    autocomplete="adresse"
                    required
                    class="input appearance-none relative block w-full px-3 pr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholder="Adresse"
                  />
                </div>
                <div>
                  <input
                    id="telephone"
                    name="telephone"
                    type="tel"
                    autocomplete="tel"
                    required
                    class="input appearance-none relative block w-full px-3 pr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholder="Numéro de téléphone"
                  />
                </div>
              </div>
            </div>
            <div class="flex items-center text-white">
              <label class="inline-flex items-center">
                <input type="radio" class="form-radio text-blue-500" name="gender" value="male" />
                <span class="ml-2">Homme</span>
              </label>
              <label class="inline-flex items-center ml-6">
                <input type="radio" class="form-radio text-pink-500" name="gender" value="female" />
                <span class="ml-2">Femme</span>
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
        </div>
      </div>
    </div>
  );
};

export default Register;