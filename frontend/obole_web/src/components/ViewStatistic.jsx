import React, { useState, useEffect } from "react";

// Import dependencies
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import * as chart from "chart.js/auto";

// Import components
import Loader from "./loader";

const StatisticsTable = () => {
  const [data, setData] = useState(null);
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_CONNECTION_STRING + "/stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const groupedPayments = response.data.payments.reduce(
          (acc, payment) => {
            if (!acc[payment.categorie]) {
              acc[payment.categorie] = 0;
            }
            acc[payment.categorie] += payment.amount;
            return acc;
          },
          {}
        );

        const groupedTransactions = response.data.transactions.reduce(
          (acc, transaction) => {
            acc += transaction.amount;
            return acc;
          },
          0
        );

        setData({
          payments: groupedPayments,
          transactions: groupedTransactions,
        });
      } catch (error) {
        setResponseStatus(error.response);
      }
    };

    fetchData();
  }, []);

  const paymentCategories = Object.keys(data?.payments || []);
  const transactionAmount = data?.transactions || 0;

  const paymentChartData = {
    labels: [...paymentCategories, "Transactions"],
    datasets: [
      {
        data: [...Object.values(data?.payments || []), transactionAmount],
        backgroundColor: [
          "#000080",
          "#FFA500",
          "#800080",
          "#36A2EB",
          "#FFFF00",
          "#FF69B4",
          "#FF0000",
          "#CCCCCC",
          "#006400",
        ],
      },
    ],
  };

  return (
    <div className="p-4 bg-white h-screen flex items-center justify-center">
      {data ? (
        <div className="p-6 w-[60vw]">
          <div className="h-full flex items-center justify-center">
            <div className="w-3/4 max-w-screen-xl">
              <h2 className="text-center">Payments and Transactions</h2>
              <Doughnut data={paymentChartData} />
            </div>
          </div>
          {responseStatus && (
            <div className="text-center text-red-500">
              {responseStatus.data.message}
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default StatisticsTable;
