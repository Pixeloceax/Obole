import React, { useState } from "react";
import axios from "axios";

const TransactionForm = () => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [destinationAccountType, setDestinationAccountType] = useState("");
  const [transactionResponse, setTransactionResponse] = useState(null);

  const handleSavingToMainAccTransaction = async (
    amount,
    destinationAccountType
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/transaction/unsaving`,
        {
          amount,
          destinationAccountType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        setTransactionResponse("Transaction Successful");
      } else {
        setTransactionResponse("Transaction Failed");
      }
    } catch (error) {
      setTransactionResponse("Transaction Failed");
    }
  };

  const handleMainToSavingAccTransaction = async (
    amount,
    destinationAccountType
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/transaction/saving`,
        {
          amount,
          destinationAccountType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        setTransactionResponse("Transaction Successful");
      } else {
        setTransactionResponse("Transaction Failed");
      }
    } catch (error) {
      setTransactionResponse("Transaction Failed");
    }
  };

  const handleMainToAccTransaction = async (
    amount,
    currency = "EUR",
    description,
    type = "transfer",
    destinationAccount
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/transaction/${parseInt(destinationAccount)}`,
        {
          amount,
          currency,
          description,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 201) {
        setTransactionResponse("Transaction Successful");
      } else {
        setTransactionResponse("Transaction Failed");
      }
    } catch (error) {
      setTransactionResponse("Transaction Failed");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-4">Saving to Main Account</h2>
          <form onSubmit={handleSavingToMainAccTransaction}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="border rounded-md p-2 mb-2"
            />
            <input
              type="text"
              value={destinationAccountType}
              onChange={(e) => setDestinationAccountType(e.target.value)}
              placeholder="Destination Account Type"
              className="border rounded-md p-2 mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-4">Main to Saving Account</h2>
          <form onSubmit={handleMainToSavingAccTransaction}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="border rounded-md p-2 mb-2"
            />
            <input
              type="text"
              value={destinationAccountType}
              onChange={(e) => setDestinationAccountType(e.target.value)}
              placeholder="Destination Account Type"
              className="border rounded-md p-2 mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold mb-4">Main to Account</h2>
          <form onSubmit={handleMainToAccTransaction}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="border rounded-md p-2 mb-2"
            />

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="border rounded-md p-2 mb-2"
            />

            <input
              type="text"
              value={destinationAccount}
              onChange={(e) => setDestinationAccount(e.target.value)}
              placeholder="Destination Account"
              className="border rounded-md p-2 mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
