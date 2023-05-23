import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// images
import Compte_icon from "../assets/Compte.png";
import Logo from "../assets/Logo_white_bg_gray.png";
import Hamburger_icon from "../assets/Hamburger.png";
import Cartes_icon from "../assets/Cartes.png";
import Statistic_icon from "../assets/Statistic.png";
import Message_icon from "../assets/Message.png";
//TODO find and add all images for icons in white

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const navLinks = [
    { path: "/dashboard", icon: Compte_icon, text: "Compte" },
    { path: "/dashboard/cartes", icon: Cartes_icon, text: "Cartes" },
    { path: "/dashboard/statistic", icon: Statistic_icon, text: "Statistic" },
    { path: "/dashboard/epargne", icon: Compte_icon, text: "Epargne" },
    { path: "/dashboard/message", icon: Message_icon, text: "Message" },
  ];

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="top-0 left-0 h-screen bg-black text-white">
      <div className="flex flex-col justify-between h-full">
        <div
          className={`${
            isOpen ? "flex self-center pl-10" : "flex self-center"
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
            onClick={handleClick}
          >
            <img src={Hamburger_icon} alt="" className="h-10 pr-2 pt-2" />
          </button>
        </div>
        <div className="flex-grow flex-basis-auto mx-10 flex flex-col items-center space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              className={`flex flex-col items-center ${
                location.pathname === link.path ? "pl-10" : "pl-0"
              } flex-grow`}
              to={link.path}
            >
              <img
                src={link.icon}
                alt={`${link.text}_icon`}
                className="p-2 w-16"
              />
              <div className={`${isOpen ? "text-xl font-bold" : "hidden"}`}>
                {link.text}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
