import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentViewer = () => {
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/payment", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPayment(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="payment-container max-h-[400px] overflow-y-scroll">
      
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
                <td className="p-2 border">- {singlePayment.amount}</td>
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
