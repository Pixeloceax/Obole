import React, { useState, useEffect } from "react";

// Import dependencies
import axios from "axios";

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
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="transaction-container max-h-[400px] overflow-y-scroll">
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Source Account</th>
            <th className="p-2 border">Destination Account</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            // const isSameAccount = acc === transaction.destinationAccount;
            // const formattedAmount = isSameAccount
            //   ? `+${transaction.amount}`
            //   : `-${transaction.amount}`;

            return (
              <tr key={transaction.id} className="hover:bg-gray-100">
                {/* <td className="p-2 border">{formattedAmount}</td> */}
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
