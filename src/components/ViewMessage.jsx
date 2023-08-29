import React, { useState } from "react";

// Import assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const discussions = [
  {
    id: 1,
    name: "Conseiller Clientèle",
    messages: [
      "Bonjour, je suis intéressé par l'ouverture d'un compte d'épargne. Pouvez-vous m'en dire plus sur les taux d'intérêt actuels ?",
      "Bonjour! Bien sûr, je serais ravi de vous aider. Actuellement, notre taux d'intérêt pour les comptes d'épargne est de 1,5 % APY. C'est l'un des meilleurs taux disponibles sur le marché. Souhaitez-vous en savoir plus sur les conditions ?",
      "Absolument, nous proposons des comptes d'épargne pour les enfants avec des taux adaptés à leur tranche d'âge. Les comptes pour enfants sont exonérés de frais mensuels et ne nécessitent qu'un dépôt initial de 50 $. C'est un excellent moyen de les initier à l'épargne.",
      "C'est une excellente option pour initier les enfants à l'épargne. Si vous avez d'autres questions concernant nos comptes d'épargne ou si vous souhaitez ouvrir un compte, n'hésitez pas à me le faire savoir. Je suis là pour vous aider.",
    ],
  },
  {
    id: 2,
    name: "Gestionnaire de Crédit",
    messages: [
      "Bonjour, j'aimerais en savoir plus sur les prêts hypothécaires que vous offrez.",
      "Bonjour! Nous proposons divers types de prêts hypothécaires, y compris à taux fixe et à taux variable. Pourriez-vous me donner une idée de vos besoins spécifiques en matière de prêt hypothécaire ?",
      "Je recherche un prêt hypothécaire à taux fixe pour l'achat d'une maison. Quelles sont les conditions et les taux actuels ?",
      "Les conditions dépendent de divers facteurs, notamment de votre pointage de crédit et de vos revenus. Nous pouvons discuter de vos détails financiers pour vous fournir des informations plus précises. Les taux actuels pour les prêts hypothécaires à taux fixe varient en fonction de la durée du prêt. Pouvons-nous organiser une réunion pour discuter de vos besoins plus en détail ?",
    ],
  },
  {
    id: 3,
    name: "Expert en Investissement",
    messages: [
      "Bonjour, je suis intéressé par l'investissement dans des fonds communs de placement. Pouvez-vous me donner des conseils à ce sujet ?",
      "Bonjour! C'est formidable que vous envisagiez d'investir. Les fonds communs de placement sont un excellent moyen de diversifier vos investissements. Pourriez-vous me donner une idée de votre tolérance au risque et de vos objectifs financiers ?",
      "Absolument. Je préfère un investissement à faible risque, mais je veux aussi voir un rendement stable à long terme.",
      "C'est compréhensible. Nous pouvons explorer des fonds communs de placement axés sur la stabilité et le rendement. Je peux vous recommander quelques options qui correspondent à vos critères. Pouvons-nous discuter davantage de votre horizon de placement et de vos préférences ?",
    ],
  },
  {
    id: 4,
    name: "Support en Ligne",
    messages: [
      "Bonjour, j'ai besoin d'aide concernant une transaction récente sur mon compte.",
      "Bonjour! Je suis là pour vous aider. Pouvez-vous me fournir plus de détails sur la transaction en question ?",
      "Oui, bien sûr. J'ai remarqué une déduction inattendue sur mon compte hier soir. Je ne suis pas sûr de ce que c'est.",
      "Je comprends votre préoccupation. Pourriez-vous me fournir le montant de la déduction ainsi que la date et la description de la transaction ? Je vais vérifier cela pour vous.",
    ],
  },
];

const ViewMessage = () => {
  const [selectedDiscussion, setSelectedDiscussion] = useState(discussions[0]);
  const [showDiscussion, setShowDiscussion] = useState(false);

  const handleClick = () => {
    setShowDiscussion(!showDiscussion);
  };

  return (
    <div className="flex justify-center h-screen">
      <div
        className={`md:w-1/5 flex flex-col justify-between m-6 md:flex
        ${showDiscussion ? "hidden" : "md:flex"}
      `}
      >
        <h1 className="text-3xl mb-5 text-center font-bold">Message</h1>
        <div className="flex flex-col justify-evenly flex-grow">
          {discussions.map((discussion) => (
            <button
              key={discussion.id}
              className="p-4 text-black rounded-2xl border-2 border-purple justify-between flex items-center"
              onClick={() => {
                setSelectedDiscussion(discussion);
                handleClick();
              }}
            >
              <p>{discussion.name}</p>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          ))}
        </div>
      </div>
      <div
        className={`md:w-4/5 flex-col justify-between md:rounded-2xl border-2 border-black md:m-10 text-white items-center md:flex md:h-auto h-fit ${
          showDiscussion ? "md:flex" : "hidden"
        }`}
      >
        <div className="flex flex-col space-y-4 w-full">
          <div className="w-full bg-black md:rounded-t-xl p-4 flex items-center">
            <button className="md:hidden block">
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="text-white text-2xl mr-2"
                onClick={() => handleClick()}
              />
            </button>
            <h1 className=" text-3xl font-bold text-center flex-grow">
              {selectedDiscussion.name}
            </h1>
          </div>

          <div className="p-4">
            {selectedDiscussion.messages.map((message, index) => (
              <div
                key={index}
                className="w-full flex justify-center
              "
              >
                <div
                  className={`flex w-full p-4 items-start my-2 md:rounded-2xl rounded-lg 
                ${
                  index % 2 === 0
                    ? " bg-purple justify-end md:ml-[20vw]"
                    : " bg-purple_foncer md:mr-[20vw] justify-start"
                }`}
                >
                  <p className="">{message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="bg-purple p-4 m-4 rounded-full flex items-center bottom-0">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow px-2 py-1 bg-transparent focus:outline-none text-white"
            />
            <button className="text-purple_foncer text-3xl pr-4">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMessage;
