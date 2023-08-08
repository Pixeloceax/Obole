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
      const _id = sessionStorage.getItem("_id"); // Get _id from sessionStorage
      const response = await axios.post(
        "https://obole-back.onrender.com/transaction",
        { ...formData, _id } // Include _id in the request body
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
    <div className="bg-white h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-[#fff] p-8 shadow-md rounded"
      >
        <div className="mb-4">
          <input
            type="text"
            name="sourceAccount"
            placeholder="Source Account"
            value={formData.sourceAccount}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="destinationAccount"
            placeholder="Destination Account"
            value={formData.destinationAccount}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="currency"
            placeholder="Currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
