import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const ViewSavings = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("A");
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/saving", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSaving = async (type) => {
    try {
      const response = await fetch(`http://localhost:5000/saving`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ type: type }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const result = await response.json();
      setData(result);
      window.location.reload(true);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
      window.alert(error);
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