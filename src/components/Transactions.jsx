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
        "https://obole-back.onrender.com//transaction",
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
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <div className="mb-4">
        <input
          type="text"
          name="sourceAccount"
          placeholder="Source Account"
          value={formData.sourceAccount}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="destinationAccount"
          placeholder="Destination Account"
          value={formData.destinationAccount}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="currency"
          placeholder="Currency"
          value={formData.currency}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default TransactionForm;
