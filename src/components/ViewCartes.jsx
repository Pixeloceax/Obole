import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/Logo_white_bg_gray.png";


function CartesBancaires() {
    const _id = sessionStorage.getItem("_id");
    const [data, setData] = useState(null);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/dashboard?_id=${_id}`
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
                        <div className="bg-purple rounded-3xl  relative shadow-xl border-b-6 border-r-6 border-gray-700">
                            <div className="relative h-full">
                                <div
                                    key={carte._id}
                                    className="my-6 p-6 flex flex-col justify-between"
                                >
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-2xl font-bold">{`Carte ${index + 1}`}</h1>
                                    </div>
                                    <div className="flex mt-6 justify-around">
                                        <div className="bg-black rounded-3xl max-w-md relative shadow-xl border-b-6 border-r-6 text-white border-gray-700 w-[70%]">
                                            <div className="relative h-full p-5">
                                                <div>
                                                    <img src={logo} alt="logo" className="h-32" />
                                                </div>
                                                <p className="text-lg font-medium pt-5">
                                                    **** **** **** {carte.carteNumber.toString().slice(0, 4)}{" "}
                                                </p>
                                                <div className="flex justify-between items-center pt-5">
                                                    <p className="text-lg font-medium">
                                                        {data.Information.nom} {data.Information.prenom}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col text-center">
                                            <div className="relative pt-1">
                                                <div className="flex mb-2 items-center justify-between">
                                                    <div>
                                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full">
                                                            Plafond utilisé
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs font-semibold inline-block">
                                                            {carte.utilisé} € / {carte.plafond} €
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
                                                    <div
                                                        style={{ width: `${(carte.utilisé / carte.plafond) * 100}%` }}
                                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                                                    ></div>
                                                </div>
                                            </div>
                                            {carte.verrouiller ? (
                                                <p className="text-lg font-medium text-red-600">
                                                    Carte verrouillée
                                                </p>
                                            ) : (
                                                <p className="text-lg font-medium text-green-600">
                                                    Carte déverrouillée
                                                </p>
                                            )}
                                            {carte.opposition ? (
                                                <p className="text-lg font-medium text-red-600">
                                                    Carte opposition
                                                </p>
                                            ) : (
                                                <p className="text-lg font-medium text-green-600">
                                                    Carte en cours d'utilisation
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            ) : (
                <p>Chargement en cours...</p>
            )}
        </div>
    );
}
export default CartesBancaires;
