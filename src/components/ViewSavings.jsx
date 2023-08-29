import React, { useState, useEffect } from "react";

// Import dependencies
import axios from "axios";

// Import components
import Loader from "./loader";

// Import assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const ViewSavings = () => {
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState("A");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_CONNECTION_STRING + "/saving",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSaving = async (type) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_CONNECTION_STRING + `/saving`,
        { type: type },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) {
        return;
      }
      setData(response.data);
      window.location.reload(true);
    } catch (error) {
      console.error(error.message);
      window.alert(
        "Une erreur est survenue, vous ne pouvez pas crée de compte ayant le même type'"
      );
    }
  };

  return (
    <div className="p-4 bg-white h-screen">
      {data.length > 0 ? (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Epargnes</h1>
          {data.map((account) => (
            <div
              className="bg-purple rounded-lg text-white p-4 mb-4 text-center"
              key={account._id}
            >
              <h2 className="text-4xl font-bold mb-4">Type: {account.type}</h2>
              <p className="text-2xl">
                Numéro de compte: {account.savingAccountNumber}
              </p>
              <p className="text-2xl">Solde: {account.savingsBalance} €</p>
              <p className="text-2xl">
                Taux d'intérêt: {account.interestRate}%
              </p>
              <p className="text-2xl">
                Prochain Solde:{" "}
                {account.savingsBalance * (1 + account.interestRate / 100)} €
              </p>
            </div>
          ))}
          <div className="flex justify-center py-10">
            <select
              name="Selector"
              className="bg-purple text-white text-3xl font-bold mr-5 pl-2 rounded-lg"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="A">A</option>
              <option value="jeune">Jeune</option>
            </select>
            <button
              onClick={() => {
                handleSaving(selectedType);
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
};

export default ViewSavings;
