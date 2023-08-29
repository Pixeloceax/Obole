import React from "react";

// Import dependencies
import { Link, useLocation } from "react-router-dom";

// Import assets
import Logo from "../assets/Logo_white_bg_gray.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faCreditCard,
  faChartLine,
  faPiggyBank,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: "/dashboard", icon: faWallet, text: "Compte" },
    { path: "/dashboard/cartes", icon: faCreditCard, text: "Cartes" },
    { path: "/dashboard/statistic", icon: faChartLine, text: "Statistic" },
    { path: "/dashboard/epargne", icon: faPiggyBank, text: "Epargne" },
    { path: "/dashboard/message", icon: faMessage, text: "Message" },
  ];

  return (
    <div className="top-0 left-0 text-white">
      <div className="flex flex-col justify-between h-full md:w-40 w-20 fixed bg-black">
        <div className="flex self-center">
          <div className="h-36">
            <img src={Logo} alt="Logo" className="md:h-40 h-20" />
          </div>
        </div>
        <div className="flex-grow flex-basis-auto mx-10 flex flex-col items-center space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              className={
                `flex flex-row items-center justify-center space-y-1 rounded-xl p-2 flex-grow` +
                (location.pathname === link.path ? " text-purple_clair" : " ")
              }
              to={link.path}
            >
              <FontAwesomeIcon
                icon={link.icon}
                className="md:text-3xl text-3xl md:pr-2"
              />
              <div className="text-xl font-bold md:block hidden">
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
