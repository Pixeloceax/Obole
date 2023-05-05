import { useState } from "react";
import axios from "axios";

function Transaction() {
  const [transactionData, setTransactionData] = useState({
    _id: "",
    destinataire: "",
    montant: "",
  });

  const [compte, setCompte] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setTransactionData({
      ...transactionData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/transaction",
        transactionData
      );
      setCompte(response.data.Compte);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
      setCompte(null);
    }
  };

  return (
    <div>
      <h1>Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="destinataire">Destinataire</label>
          <input
            type="text"
            id="destinataire"
            name="destinataire"
            onChange={handleChange}
            value={transactionData.destinataire}
          />
        </div>
        <div>
          <label htmlFor="montant">Montant</label>
          <input
            type="text"
            id="montant"
            name="montant"
            onChange={handleChange}
            value={transactionData.montant}
          />
          <button type="submit">Envoyer</button>
        </div>
      </form>
      {compte && (
        <div>
          <p>Compte: {compte._id}</p>
          <p>Solde: {compte.solde}</p>
          {/* render other properties of the compte object as needed */}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Transaction;
