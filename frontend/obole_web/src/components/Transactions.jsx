import React, { useState } from "react";

// Import dependencies
import axios from "axios";

// Import components
import PaymentViewer from "./PaymentViewer";
import TransactionViewer from "./TransactionViewer";

const TransactionForm = () => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [transactionResponse, setTransactionResponse] = useState(null);
  const [sourceAccount, setSourceAccount] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [destinationToOtherAccount, setDestinationToOtherAccount] =
    useState("");

  const handleTransaction = async () => {
    try {
      let response;

      if (sourceAccount === "main" && destinationAccount === "A") {
        response = await axios.put(
          process.env.REACT_APP_CONNECTION_STRING + "/transaction/saving",
          { amount, destinationAccountType: destinationAccount },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else if (sourceAccount === "main" && destinationAccount === "jeune") {
        response = await axios.put(
          process.env.REACT_APP_CONNECTION_STRING + "/transaction/saving",
          { amount, destinationAccountType: destinationAccount },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else if (sourceAccount === "A" && destinationAccount === "main") {
        response = await axios.put(
          process.env.REACT_APP_CONNECTION_STRING + "/transaction/unsaving",
          { amount, sourceAccountType: sourceAccount },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else if (sourceAccount === "jeune" && destinationAccount === "main") {
        response = await axios.put(
          process.env.REACT_APP_CONNECTION_STRING + "/transaction/unsaving",
          { amount, sourceAccountType: sourceAccount },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else if (sourceAccount === "main" && destinationAccount === "main") {
        throw new Error("You can't transfer to the same account");
      } else if (sourceAccount === destinationAccount) {
        throw new Error("You can't transfer to the same account");
      } else {
        response = await axios.post(
          process.env.REACT_APP_CONNECTION_STRING +
            `/transaction/${destinationToOtherAccount}`,
          { amount, currency: "USD", description, type: "Transfer" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      if (response.status === 201) {
        setTransactionResponse("Transaction Successful");
      } else {
        setTransactionResponse("Transaction Failed");
      }
    } catch (error) {
      setTransactionResponse(
        error.response?.data?.message || "Transaction Failed"
      );
    }
  };

  const handleTransactionSubmit = async (event) => {
    event.preventDefault();

    if (!amount || sourceAccount === "" || destinationAccount === "") {
      setTransactionResponse("Please fill in all the required fields");
      return;
    }

    if (
      sourceAccount === destinationAccount ||
      sourceAccount === destinationToOtherAccount
    ) {
      setTransactionResponse("You can't transfer to the same account");
      return;
    }

    if (
      (destinationAccount === "other" && sourceAccount === "A") ||
      (destinationAccount === "other" && sourceAccount === "jeune")
    ) {
      setTransactionResponse(
        "You can't transfer from a saving account to other account"
      );
      return;
    }

    if (
      destinationToOtherAccount === sourceAccount ||
      destinationToOtherAccount === destinationAccount
    ) {
      setTransactionResponse("You can't transfer to the same account");
      return;
    }

    await handleTransaction();

    setAmount(0);
    setDescription("");
    setSourceAccount("");
    setDestinationAccount("");
    setDestinationToOtherAccount("");
  };

  return (
    <div className=" mx-auto p-4 bg-white shadow-md rounded-lg h-screen">
      <h1 className="text-2xl font-semibold mb-4 flex justify-center">
        Transfer Funds
      </h1>

      <div className="flex justify-center">
        <form onSubmit={handleTransactionSubmit} className="max-w-xl">
          <label htmlFor="amount" className="block font-semibold mb-1">
            Amount
          </label>
          <input
            type="number"
            min="0"
            id="amount"
            name="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="border rounded p-2 w-full mb-2"
          />

          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Destination Account
            </label>
            {destinationAccount === "other" ? (
              <>
                <input
                  type="number"
                  min="0"
                  placeholder="Enter destination account"
                  className="border rounded p-2 w-full mb-2"
                  onChange={(event) =>
                    setDestinationToOtherAccount(event.target.value)
                  }
                />

                <button onClick={() => setDestinationAccount("A")}>
                  Cancel
                </button>
              </>
            ) : (
              <select
                id="destinationAccount"
                name="destinationAccount"
                value={destinationAccount}
                onChange={(event) => setDestinationAccount(event.target.value)}
                className="border rounded p-2 w-full mb-2"
              >
                <option value="default" hidden />
                <option value="main">Main Account</option>
                <option value="A">A</option>
                <option value="jeune">jeune</option>
                <option value="other">Other</option>
              </select>
            )}
          </div>

          <label htmlFor="sourceAccount" className="block font-semibold mb-1">
            Source Account
          </label>
          <select
            id="sourceAccount"
            name="sourceAccount"
            value={sourceAccount}
            onChange={(event) => setSourceAccount(event.target.value)}
            className="border rounded p-2 w-full mb-4"
          >
            <option value="default" hidden />
            <option value="main">Main Account</option>
            <option value="A">A</option>
            <option value="jeune">jeune</option>
          </select>

          {destinationAccount === "other" && sourceAccount === "main" && (
            <div className="mb-4">
              <label htmlFor="description" className="block font-semibold mb-1">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="border rounded p-2 w-full mb-2"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 mr-2"
            aria-label="Submit"
          >
            Submit
          </button>
          <button
            type="button"
            className="border rounded px-4 py-2 ml-2"
            aria-label="Cancel"
          >
            Cancel
          </button>
        </form>
      </div>

      {transactionResponse && (
        <div className="mt-4">
          <p>{transactionResponse}</p>
        </div>
      )}

      <section>
        <h2 className="mb-4 text-lg font-semibold">Payments</h2>
        <PaymentViewer />
        <h2 className="mb-4 text-lg font-semibold">Transactions</h2>
        <TransactionViewer />
      </section>
    </div>
  );
};

export default TransactionForm;
