import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

// images
import Compte_icon from "../assets/Compte.png";
import Logo from "../assets/Logo_white_bg_gray.png";
import Hamburger_icon from "../assets/Hamburger.png";
import Cartes_icon from "../assets/Cartes.png";
import Statistic_icon from "../assets/Statistic.png";
import Message_icon from "../assets/Message.png";
//TODO find and add all images for icons in white

//TODO 3

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const HandleClick = () => {
    setIsOpen(!isOpen);
  };

  const location = useLocation();

  return (
    <div className="top-0 left-0 h-screen bg-black text-white">
      <div className="flex flex-col justify-between h-full">
        <div
          className={`${
            isOpen ? "flex self-center pl-10" : "flex self-center "
          }`}
        >
          <div className="h-40">
            <img
              src={Logo}
              alt="Logo"
              className={`${isOpen ? "h-40" : "hidden"}`}
            />
          </div>
          <button
            type="button"
            className={`${isOpen ? "self-start" : "flex self-center"}`}
            onClick={HandleClick}
          >
            <img src={Hamburger_icon} alt="" className="h-10 pr-2 pt-2" />{" "}
            {/*//TODO if click add other view and change hambuger */}
          </button>
        </div>
        <div className="flex-grow flex-basis-auto mx-10 flex items-center">
          <Link
            className={`flex flex-row items-center ${
              location.pathname === "/dashboard" ? "pl-10" : "pl-0"
            }`}
            to="/dashboard"
          >
            {" "}
            {/*//TODO if on the page add pl-10 style */}
            <img src={Compte_icon} alt="Compte_icon" className="p-2 w-16" />
            <div className={`${isOpen ? "text-xl font-bold" : "hidden"}`}>
              Compte
            </div>
          </Link>
        </div>
        <div className="flex-grow flex-basis-auto mx-10 flex items-center">
          <Link
            className={`flex flex-row items-center ${
              location.pathname === "/cartes" ? "pl-10" : "pl-0"
            }`}
            to="/cartes"
          >
            <img src={Cartes_icon} alt="Compte_icon" className="p-2 w-16" />
            <div className={`${isOpen ? "text-xl font-bold" : "hidden"}`}>
              Cartes
            </div>
          </Link>
        </div>
        <div className="flex-grow flex-basis-auto mx-10 flex items-center">
          <Link
            className={`flex flex-row items-center ${
              location.pathname === "/statistic" ? "pl-10" : "pl-0"
            }`}
            to="/statistic"
          >
            <img src={Statistic_icon} alt="Compte_icon" className="p-2 w-16" />
            <div className={`${isOpen ? "text-xl font-bold" : "hidden"}`}>
              Statistic
            </div>
          </Link>
        </div>
        <div className="flex-grow flex-basis-auto mx-10 flex items-center">
          <Link
            className={`flex flex-row items-center ${
              location.pathname === "/epargne" ? "pl-10" : "pl-0"
            }`}
            to="/epargne"
          >
            <img src={Compte_icon} alt="Compte_icon" className="p-2 w-16" />
            <div className={`${isOpen ? "text-xl font-bold" : "hidden"}`}>
              Epargne
            </div>
          </Link>
        </div>
        <div className="flex-grow flex-basis-auto mx-10 flex items-center">
          <Link
            className={`flex flex-row items-center ${
              location.pathname === "/message" ? "pl-10" : "pl-0"
            }`}
            to="/message"
          >
            <img src={Message_icon} alt="Compte_icon" className="p-2 w-16" />
            <div className={`${isOpen ? "text-xl font-bold" : "hidden"}`}>
              Message
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
