import React, { useEffect, useState } from "react";
import logo from "../assets/Logo_white_bg_gray.png";
import plus from "../assets/plus.png";

import Loader from "./loader";

function CartesBancaires() {
  const _id = sessionStorage.getItem("_id");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://obole-back.onrender.com//dashboard?_id=${_id}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        console.log(response);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [_id]);

  const handleClickButton = (type, index) => async () => {
    try {
      let newPlafond;
      if (type === "plafond") {
        newPlafond = prompt(
          "Veuillez entrer le nouveau plafond pour la carte :"
        );
        while (
          !/^[0-9]+$/.test(newPlafond) ||
          newPlafond < data.Carte[index].utilisé
        ) {
          alert(
            "Veuillez entrer uniquement des nombres et un montant supérieur à votre dépense effectuée."
          );
          newPlafond = prompt(
            "Veuillez entrer le nouveau plafond pour la carte :"
          );
        }
      }
      const response = await fetch(
        `https://obole-back.onrender.com//carte?_id=${_id}&type=${type}&index=${index}&newPlafond=${newPlafond}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      console.log(response);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (index) => async () => {
    try {
      const response = await fetch(
        `https://obole-back.onrender.com//carte?_id=${_id}&type=delete&index=${index}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      console.log(response);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white h-full">
      {data ? (
        <div className="ml-5">
          <div className="flex justify-between">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Cartes bancaires
            </h1>
          </div>
          {data.Carte.map((carte, index) => (
            <div
              key={carte._id}
              className="bg-purple rounded-3xl relative shadow-xl border-b-6 border-r-6 border-gray-700 p-6 mb-6"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{`Carte ${index + 1}`}</h1>
                <button
                  onClick={handleDelete(index)}
                  className="text-lg bg-black text-white font-bold py-2 px-4 rounded-full"
                >
                  Supprimer
                </button>
              </div>
              <div className="flex mt-6 justify-around">
                <div className="bg-black rounded-3xl max-w-md relative shadow-xl border-b-6 border-r-6 text-white border-gray-700 w-[70%]">
                  <div className="relative h-full p-5">
                    <div>
                      <img src={logo} alt="logo" className="h-32" />
                    </div>
                    <p className="text-lg font-medium pt-5">
                      **** **** **** {carte.carteNumber.toString().slice(-4)}
                    </p>
                    <div className="flex justify-between items-center pt-5">
                      <p className="text-lg font-medium">
                        {data.Information.nom} {data.Information.prenom}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col text-center">
                  <div className="relative">
                    <div className="text-right">
                      <button
                        className="text-lg bg-black text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleClickButton("plafond", index)}
                      >
                        Modifier le plafond
                      </button>
                    </div>
                    <div className="flex mb-2 items-center justify-between mt-10">
                      <div>
                        <span className="text-xl font-semibold inline-block py-1 px-2 uppercase rounded-full">
                          Plafond utilisé
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-semibold inline-block">
                          {carte.utilisé} € / {carte.plafond} €
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                      <div
                        style={{
                          width: `${(carte.utilisé / carte.plafond) * 100}%`,
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                      ></div>
                    </div>
                  </div>
                  <div className="mt-10">
                    {carte.verrouiller ? (
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
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-center py-10">
            <button onClick={handleClickButton("ajouter", 0)}>
              <img src={plus} alt="plus_carte" className="w-20" />
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
