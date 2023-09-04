import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/Logo_white_bg_gray.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Register = () => {
  const [message, setMessage] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    gender: "",
    day: "",
    month: "",
    year: "",
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const dataToSend = {
        ...formData,
        day: birthdate.getDate(),
        month: birthdate.getMonth() + 1,
        year: birthdate.getFullYear(),
      };

      const response = await axios.post(
        `${process.env.REACT_APP_CONNECTION_STRING}/register`,
        dataToSend
      );

      const data = response.data;
      if (data.message === "User Created Successfully") {
        window.location.href = "/login";
      }
      if (data.message === "Email already exists") {
        setMessage("L'email est déjà utilisé");
      }
    } catch (error) {
      console.error("Error creating user", error);
    }
  };

  return (
    <div className="md:min-h-screen flex items-center justify-center bg-white">
      <div className="">
        <div className="bg-black sm:p-20 sm:pt-[3vw] p-10 pt-10 md:rounded-3xl h-fit md:h-[90vh] md:w-[70vh] w-screen">
          <div className="flex justify-center">
            <img className="h-[15rem] md:h-fit" src={logo} alt="logo" />
          </div>
          <div>
            <h2 className="text-center text-3xl font-extrabold text-white">
              Inscription
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
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="input appearance-none relative block w-full px-3 mr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholder="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="lastName"
                    required
                    className="input appearance-none relative block w-full px-3 mr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholder="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="input appearance-none relative block w-full px-3 mr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mt-5">
                  <input
                    id="country"
                    name="country"
                    autoComplete="country"
                    required
                    className="input appearance-none relative block w-full px-3 mr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholder="Pays"
                    value={formData.country}
                    onChange={handleInputChange}
                  ></input>
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
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="address"
                    required
                    className="input appearance-none relative block w-full px-3 mr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholder="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-5">
                  <input
                    id="phone"
                    name="phone"
                    type="phone"
                    autoComplete="phone"
                    required
                    className="input appearance-none relative block w-full px-3 mr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholder="Numéro de téléphone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <DatePicker
                    id="birthdate"
                    name="birthdate"
                    selected={birthdate || null}
                    onChange={(date) => setBirthdate(date)}
                    dateFormat="dd/MM/yyyy"
                    required
                    className="input appearance-none relative block w-full px-3 mr-20 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-full sm:text-sm"
                    placeholderText="Sélectionnez une date"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center text-white justify-center">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-blue-500"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleInputChange}
                />
                <span className="ml-2">Homme</span>
              </label>
              <label className="inline-flex items-center ml-12">
                <input
                  type="radio"
                  className="form-radio text-pink-500"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleInputChange}
                />
                <span className="ml-2">Femme</span>
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Inscription
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
