import React from "react";

// Import dependencies
import { Link } from "react-router-dom";

// Import assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const data = [
  {
    title: "Bienvenue chez Obole",
    description: "Votre partenaire financier de confiance",
  },
  {
    title: "Nouvelles offres spéciales",
    description: "Découvrez nos taux compétitifs dès aujourd'hui.",
  },
];

const Information = () => {
  return (
    <>
      {data.map((item, index) => (
        <div
          key={index}
          className="text-white flex items-center justify-between mb-4"
        >
          <div>
            <h1 className="text-2xl font-semibold">{item.title}</h1>
            <p className="text-lg">{item.description}</p>
          </div>
          <Link to="/dashboard/message">
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-5xl text-white"
            />
          </Link>
        </div>
      ))}
    </>
  );
};

export default Information;
