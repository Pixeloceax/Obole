import React, { useState } from "react";

const Payment = () => {
  // Obtenir les options pour les sélecteurs de mois et d'année
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
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    number_carte: "",
    month: "",
    year: "",
    ccv: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickButton = async () => {
    try {
      const { number_carte, month, year, ccv, type } = formData;
      console.log(number_carte, month, year, ccv, type);
      const formattedDate = `${month.padStart(2, "0")}/${year.slice(-2)}`;
      const response = await fetch(
        `http://localhost:3001/payment?number_carte=${number_carte}&date=${formattedDate}&ccv=${ccv}&montant=100&type=${type}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      console.log(response);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <form className="max-w-md mx-auto bg-white p-8 shadow-md rounded">
        <label htmlFor="card_number" className="block mb-2">
          Numéro de carte :
        </label>
        <input
          type="text"
          id="card_number"
          name="number_carte"
          maxLength={16}
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

        <input
          onClick={handleClickButton}
          type="button"
          value="Acheter"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </div>
  );
};

export default Payment;
