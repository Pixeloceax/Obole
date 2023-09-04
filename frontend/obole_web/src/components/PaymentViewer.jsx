import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const PaymentViewer = () => {
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_CONNECTION_STRING + "/payment",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const sortedPayments = response.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        setPayment(sortedPayments);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchData();
  }, []);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  return (
    <div className="payment-container max-h-[400px] overflow-y-scroll text-white">
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 border">Montant</th>
            <th className="p-2 border">Catégorie</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {payment.map((singlePayment) => (
            <tr key={singlePayment.id} className="hover:bg-gray-100">
              <td className="p-2 border">
                <FontAwesomeIcon
                  icon={faMinus}
                  className="text-sm text-red-600 pr-2"
                />
                {singlePayment.amount} €
              </td>

              <td className="p-2 border">{singlePayment.categorie}</td>
              <td className="p-2 border">{formatDate(singlePayment.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentViewer;
