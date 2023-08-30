import React, { useState } from "react";

// Import dependencies
import axios from "axios";

const Payment = () => {
  const getCurrentYear = () => new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const years = Array.from(
    { length: 10 },
    (_, index) => getCurrentYear() + index
  );
  const typePayment = [
    "Loyer",
    "Nourriture",
    "Vêtements",
    "Transport",
    "Santé",
    "Loisirs",
    "Éducation",
    "Autres",
  ];
  const [setData] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: "",
    card_holder: "",
    month: "",
    year: "",
    ccv: "",
    type: "",
    prix: "",
  });

  const response = async (formData) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_CONNECTION_STRING + "/payment",
        formData
      );

      if (response.status >= 400) {
        console.error("Error response from the backend:", response.data);
      } else {
        setData(response.data);
        setResponseStatus(response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server");
      } else {
        console.error(
          "An error occurred while sending the request:",
          error.message
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const cleanedValue = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: cleanedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleClickButton = async () => {
    try {
      const { cardNumber, card_holder, month, year, ccv, type, prix } =
        formData;
      const formattedDate = `${month.padStart(2, "0")}/${year.slice(-2)}`;

      const paymentBody = {
        cardNumber: parseInt(cardNumber),
        cardHolderName: card_holder,
        expirationDate: formattedDate,
        CCV: parseInt(ccv),
        amount: parseInt(prix),
        categorie: type,
      };

      response(paymentBody);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white h-screen flex items-center justify-center">
      <form className="w-96 bg-[#fff] p-8 shadow-md rounded h-[42rem]">
        <label htmlFor="cardNumber" className="block mb-2">
          Numéro de carte :
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          maxLength={16}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded"
          onChange={handleChange}
        />
        <br />

        <label htmlFor="card_holder" className="block mb-2 mt-4">
          Nom du titulaire :
        </label>
        <input
          type="text"
          id="card_holder"
          name="card_holder"
          required
          className="w-full border border-gray-300 px-3 py-2 rounded"
          onChange={handleChange}
        />
        <br />

        <label htmlFor="date" className="block mb-2 mt-4">
          Date :
        </label>
        <div className="flex">
          <select
            id="month"
            name="month"
            required
            className="w-1/2 border border-gray-300 px-3 py-2 rounded mr-2"
            onChange={handleChange}
          >
            <option value="">Mois</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            id="year"
            name="year"
            required
            className="w-1/2 border border-gray-300 px-3 py-2 rounded ml-2"
            onChange={handleChange}
          >
            <option value="">Année</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <br />

        <label htmlFor="ccv" className="block mb-2 mt-4">
          CCV :
        </label>
        <input
          type="text"
          id="ccv"
          name="ccv"
          maxLength={3}
          required
          className="w-full border border-gray-300 px-3 py-2 rounded"
          onChange={handleChange}
        />
        <br />

        <label htmlFor="ccv" className="block mb-2 mt-4">
          Type d'achat :
        </label>
        <div className="flex">
          <select
            id="type"
            name="type"
            required
            className="w-1/2 border border-gray-300 px-3 py-2 rounded mr-2"
            onChange={handleChange}
          >
            <option value="">type d'achat</option>
            {typePayment.map((typePayments) => (
              <option key={typePayments} value={typePayments}>
                {typePayments}
              </option>
            ))}
          </select>
        </div>
        <br />

        <label htmlFor="prix" className="block mb-2 mt-4">
          Montant :
        </label>
        <input
          type="Number"
          id="prix"
          name="prix"
          required
          className="w-full border border-gray-300 px-3 py-2 rounded"
          onChange={handleChange}
        />
        <br />

        <input
          onClick={handleClickButton}
          type="button"
          value="Acheter"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        />
      </form>
      {{ responseStatus } && <p>{responseStatus}</p>}
    </div>
  );
};

export default Payment;
