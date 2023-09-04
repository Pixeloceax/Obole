import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

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

        const sortedTransactions = response.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        setTransactions(sortedTransactions);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchData();
  }, []);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  return (
    <div className="transaction-container max-h-[400px] overflow-y-scroll">
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 border">Montant</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Compte source</th>
            <th className="p-2 border">Destinataire</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            if (transaction.description === "Transfer to savings account") {
              return (
                <tr key={transaction.id} className="hover:bg-gray-100">
                  <td className="p-2 border">
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-sm text-green-600 pr-2"
                    />{" "}
                    {transaction.amount} €
                  </td>
                  <td className="p-2 border">{transaction.description}</td>
                  <td className="p-2 border">{transaction.sourceAccount}</td>
                  <td className="p-2 border">
                    {transaction.destinationAccount}
                  </td>
                  <td className="p-2 border">{formatDate(transaction.date)}</td>
                </tr>
              );
            }
            return (
              <tr key={transaction.id} className="hover:bg-gray-100">
                <td className="p-2 border">
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="text-sm text-red-600 pr-2"
                  />{" "}
                  {transaction.amount} €
                </td>
                <td className="p-2 border">{transaction.description}</td>
                <td className="p-2 border">{transaction.sourceAccount}</td>
                <td className="p-2 border">{transaction.destinationAccount}</td>
                <td className="p-2 border">{formatDate(transaction.date)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionViewer;
