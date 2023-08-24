import React, { useState, useEffect } from "react";
import axios from "axios";
// import jwtDecode from "jwt-decode";

// const account = jwtDecode(localStorage.getItem("token"));
// const acc = account.accountNumber.toString();

const TransactionViewer = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/transaction", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="transaction-container max-h-[400px] overflow-y-scroll">
      <h2 className="mb-4 text-lg font-semibold">Transactions</h2>
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
