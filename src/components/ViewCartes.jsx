import React, { useEffect, useState } from "react";

// Import dependencies
import axios from "axios";

// Import components
import Loader from "./loader";

// Import assets
import logo from "../assets/Logo_white_bg_gray.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faLock,
  faLockOpen,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

function CartesBancaires() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_CONNECTION_STRING + `/card`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status !== 200) {
          throw new Error("Something went wrong!");
        }
        setData(response.data);
      } catch (error) {
        console.error(error + "error!!!!!");
      }
    };
    fetchData();
  }, []);

  const handleAddCard = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_CONNECTION_STRING + `/card`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 201) {
        throw new Error("Something went wrong!");
      }
      setData(response.data);
      window.location.reload(true);
    } catch (error) {
      console.error(error + "error!!!!!");
    }
  };

  const handleClickButton = (type, index) => async () => {
    try {
      let newPlafond;
      let newOpposition;
      let newLocked;
      if (type === "plafond") {
        newPlafond = prompt(
          "Veuillez entrer le nouveau plafond pour la carte :"
        );
        while (!/^[0-9]+$/.test(newPlafond) || newPlafond < [index].used) {
          if (newPlafond === null) {
            return;
          }
          alert(
            "Veuillez entrer uniquement des nombres et un montant supérieur à votre dépense effectuée."
          );
          newPlafond = prompt(
            "Veuillez entrer le nouveau plafond pour la carte :"
          );
        }
      } else if (type === "opposition") {
        newOpposition = !data[index].opposition;
      } else if (type === "verrouiller") {
        newLocked = !data[index].locked;
      }

      const requestBody = {
        opposition:
          newOpposition === undefined ? data[index].opposition : newOpposition,
        locked: newLocked === undefined ? data[index].locked : newLocked,
        limit: newPlafond === undefined ? data[index].limit : newPlafond,
      };

      const response = await axios.put(
        process.env.REACT_APP_CONNECTION_STRING +
          `/card/${data[index].cardNumber}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }
      setData(response.data);
      window.location.reload(true);
    } catch (error) {
      console.error(error + "error!!!!!");
    }
  };

  const handleDelete = (index) => async () => {
    try {
      const response = await axios.delete(
        process.env.REACT_APP_CONNECTION_STRING +
          `/card/${data[index].cardNumber}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }
      setData(response.data);
      window.location.reload(true);
    } catch (error) {
      console.error(error + "error!!!!!");
    }
  };

  return (
    <div>
      {data ? (
        <div
          className={
            data.length === 2 ? `p-6 bg-white h-fit` : `p-6 bg-white h-screen`
          }
        >
          <div className="flex justify-between">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Cartes bancaires
            </h1>
          </div>
          {data.map((carte, index) => (
            <div
              key={carte._id}
              className="bg-purple rounded-3xl shadow-xl border-b-6 border-r-6 border-gray-700 p-6 mb-6"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{`Carte ${index + 1}`}</h1>
                <button
                  onClick={handleDelete(index)}
                  className="text-lg bg-black text-white font-bold py-2 px-4 rounded-full md:block hidden"
                >
                  Supprimer
                </button>
                <button
                  onClick={handleDelete(index)}
                  className="text-lg bg-black text-white font-bold py-2 px-4 rounded-full md:hidden block"
                >
                  <FontAwesomeIcon icon={faTrashCan} className="text-xl" />
                </button>
              </div>
              <div className="flex mt-6 justify-around">
                <div className="bg-black rounded-3xl max-w-md relative shadow-xl border-b-6 border-r-6 text-white border-gray-700 w-[70%] md:block hidden">
                  <div className="relative h-full p-5">
                    <div>
                      <img src={logo} alt="logo" className="h-32" />
                    </div>
                    <p className="text-lg font-medium pt-5">
                      **** **** **** {carte.cardNumber.toString().slice(-4)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-center">
                  <div className="md:hidden flex justify-center">
                    <p className="text-lg font-medium">
                      **** **** **** {carte.cardNumber.toString().slice(-4)}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="md:text-right text-center">
                      <button
                        className="text-lg bg-black text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleClickButton("plafond", index)}
                      >
                        Modifier le plafond
                      </button>
                    </div>
                    <div className="md:flex mb-2 items-center justify-between mt-10">
                      <div>
                        <span className="md:text-xl text-sm font-semibold inline-block sm:py-1 sm:px-2 uppercase">
                          Plafond utilisé
                        </span>
                      </div>
                      <div className="md:text-right">
                        <span className="md:text-xl text-sm font-semibold inline-block">
                          {carte.used} € / {carte.limit} €
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                      <div
                        style={{
                          width: `${(carte.used / carte.limit) * 100}%`,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                      ></div>
                    </div>
                  </div>
                  <div className="mt-10 md:block hidden">
                    {carte.locked ? (
                      <button
                        type="button"
                        className="mr-10 text-xl bg-black text-white font-bold py-2 px-4 rounded-full w-44"
                        onClick={handleClickButton("verrouiller", index)}
                      >
                        Déverrouiller
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="mr-10 text-xl bg-black text-white font-bold py-2 px-4 rounded-full w-44"
                        onClick={handleClickButton("verrouiller", index)}
                      >
                        Verrouiller
                      </button>
                    )}
                    {carte.opposition ? (
                      <button
                        type="button"
                        className="text-xl bg-black text-white font-bold py-2 px-4 rounded-full w-56"
                        onClick={handleClickButton("opposition", index)}
                      >
                        Annuler l'Opposition
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-xl bg-black text-white font-bold py-2 px-4 rounded-full w-56"
                        onClick={handleClickButton("opposition", index)}
                      >
                        Faire Opposition
                      </button>
                    )}
                  </div>
                  <div className="mt-5 md:hidden flex">
                    {carte.locked ? (
                      <button
                        type="button"
                        className="mr-5 text-xl bg-black text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleClickButton("verrouiller", index)}
                      >
                        <FontAwesomeIcon
                          icon={faLockOpen}
                          className="text-sm"
                        />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="mr-5 text-xl bg-black text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleClickButton("verrouiller", index)}
                      >
                        <FontAwesomeIcon icon={faLock} className="text-sm" />
                      </button>
                    )}
                    {carte.opposition ? (
                      <button
                        type="button"
                        className="text-md bg-black text-white font-bold py-2 px-4 rounded-full w-44"
                        onClick={handleClickButton("opposition", index)}
                      >
                        Annuler l'Opposition
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-md bg-black text-white font-bold py-2 px-4 rounded-full w-44"
                        onClick={handleClickButton("opposition", index)}
                      >
                        Faire Opposition
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center py-10">
            <button
              onClick={() => {
                handleAddCard();
              }}
            >
              <FontAwesomeIcon icon={faCirclePlus} className="text-6xl" />
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default CartesBancaires;
