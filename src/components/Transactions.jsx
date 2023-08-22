import React, { useState } from "react";
import axios from "axios";

const TransactionForm = () => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("Transfer");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [destinationAccountType, setDestinationAccountType] = useState("");
  const [transactionResponse, setTransactionResponse] = useState(null);
  const [formFromOption, setFormFromOption] = useState(null);
  const [formToOption, setFormToOption] = useState(null);
  const [showSavingAcc, setShowSavingAcc] = useState(false);
  const [showMainAcc, setShowMainAcc] = useState(false);
  const [showAccountChoices, setShowAccountChoices] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const transactionFromSavingAccToMainAcc = async (
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

  const transactionFromMainAccToSavingAcc = async (
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

  const transactionFromMainAccToAcc = async (
    amount,
    currency,
    description,
    type,
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

  const handleFromButtonClick = () => {
    setShowAccountChoices(true);
  };

  const handleAccountChoice = (accountType) => {
    setFormFromOption(accountType);
    setShowAccountChoices(false);
    setShowForm(true);
    if (accountType === "A" || accountType === "jeune") {
      setShowSavingAcc(true);
      setShowMainAcc(false);
      setDestinationAccountType(accountType);
    } else {
      setShowMainAcc(true);
      setShowSavingAcc(false);
    }
  };

  const handleToButtonClick = (accountType) => {
    setFormToOption(accountType);
    if (accountType === "Saving") {
      if (formFromOption === "A" || formFromOption === "jeune") {
        setDestinationAccountType("A");
      } else {
        setDestinationAccountType("B");
      }
    } else {
      setShowMainAcc(true);
      setShowSavingAcc(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (destinationAccount === "unsaving" || destinationAccount === "saving") {
      if (
        destinationAccountType === "A" ||
        destinationAccountType === "jeune"
      ) {
        transactionFromSavingAccToMainAcc(amount, destinationAccountType);
      } else {
        transactionFromMainAccToSavingAcc(amount, destinationAccountType);
      }
    } else if (destinationAccount === "account") {
      transactionFromMainAccToAcc(
        amount,
        currency,
        description,
        transactionType,
        destinationAccount
      );
    }
  };

  return (
    <div>
      <button onClick={handleFromButtonClick}>
        {showAccountChoices || showForm ? "Cancel" : "From"}
      </button>
      {showAccountChoices && (
        <div>
          <button onClick={() => handleAccountChoice("A")}>A</button>
          <button onClick={() => handleAccountChoice("jeune")}>jeune</button>
        </div>
      )}
      {showForm && showSavingAcc && (
        <form onSubmit={handleSubmit}>
          {formFromOption === "A" && (
            <>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
              <input type="hidden" value="A" onChange={() => {}} />
            </>
          )}
          {formFromOption === "jeune" && (
            <>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
              <input type="hidden" value="jeune" onChange={() => {}} />
            </>
          )}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default TransactionForm;
