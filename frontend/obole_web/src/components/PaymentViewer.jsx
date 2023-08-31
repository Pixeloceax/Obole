import React, { useEffect, useState } from "react";

// Import dependencies
import axios from "axios";


// Import assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";

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
        setPayment(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="payment-container max-h-[400px] overflow-y-scroll text-white">
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Category</th>
          </tr>
        </thead>
        <tbody>
          {payment.map((singlePayment) => {
            return (
              <tr key={singlePayment.id} className="hover:bg-gray-100">
                <td className="p-2 border">
                <FontAwesomeIcon icon={faArrowTrendDown} className="text-sm text-red-600 pr-2" />
                 {singlePayment.amount}</td>
                <td className="p-2 border">{singlePayment.categorie}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentViewer;
