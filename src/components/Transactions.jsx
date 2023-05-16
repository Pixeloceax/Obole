import React, { useState } from "react";
import axios from "axios";

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    sourceAccount: "",
    destinationAccount: "",
    amount: 0,
    currency: "",
    description: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/transaction",
        formData
      );
      console.log(response.data); // Do something with the response
      // Reset form data
      setFormData({
        sourceAccount: "",
        destinationAccount: "",
        amount: 0,
        currency: "",
        description: "",
        type: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="sourceAccount"
        placeholder="Source Account"
        value={formData.sourceAccount}
        onChange={handleChange}
      />
      <input
        type="text"
        name="destinationAccount"
        placeholder="Destination Account"
        value={formData.destinationAccount}
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
      />
      <input
        type="text"
        name="currency"
        placeholder="Currency"
        value={formData.currency}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={formData.type}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TransactionForm;
