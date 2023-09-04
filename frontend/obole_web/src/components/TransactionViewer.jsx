import React, { useState, useEffect } from "react";

// Import dependencies
import axios from "axios";

// Import assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";

const TransactionViewer = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_CONNECTION_STRING + "/transaction",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTransactions(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="transaction-container max-h-[400px] overflow-y-scroll">
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 border">Montant</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Compte source</th>
            <th className="p-2 border">Compte de destination</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            if (transaction.description === "Transfer to savings account") {
              return (
                <tr key={transaction.id} className="hover:bg-gray-100">
                  <td className="p-2 border">
                  <FontAwesomeIcon icon={faArrowTrendUp} className="text-sm text-green-600 pr-2" /> {transaction.amount} €</td>
                  <td className="p-2 border">{transaction.description}</td>
                  <td className="p-2 border">{transaction.sourceAccount}</td>
                  <td className="p-2 border">{transaction.destinationAccount}</td>
                </tr>
              );
            }
            return (
              <tr key={transaction.id} className="hover:bg-gray-100">
                <td className="p-2 border">
                <FontAwesomeIcon icon={faArrowTrendDown} className="text-sm text-red-600 pr-2" /> {transaction.amount} €</td>
                <td className="p-2 border">{transaction.description}</td>
                <td className="p-2 border">{transaction.sourceAccount}</td>
                <td className="p-2 border">{transaction.destinationAccount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionViewer;
