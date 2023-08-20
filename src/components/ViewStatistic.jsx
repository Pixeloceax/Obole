import React, { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const StatisticsTable = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fakeData = [
      {
        transactions: [
          {
            amount: 100,
            currency: "EUR",
            description: "Transfer from savings account",
            type: "Transfer",
            date: "2023/08/14",
          },
          {
            amount: 100,
            currency: "EUR",
            description: "Transfer to savings account",
            type: "Transfer",
            date: "2023/08/14",
          },
        ],
        payments: [
          {
            amount: 20,
            categorie: "Loyer",
            date: "2023/08/14",
          },
          {
            amount: 20,
            categorie: "Nourriture",
            date: "2023/08/14",
          },
          {
            amount: 20,
            categorie: "Vêtements",
            date: "2023/08/14",
          },
          {
            amount: 20,
            categorie: "Transport",
            date: "2023/08/14",
          },
          {
            amount: 20,
            categorie: "Santé",
            date: "2023/08/14",
          },
          {
            amount: 20,
            categorie: "Loisirs",
            date: "2023/08/14",
          },
          {
            amount: 20,
            categorie: "Éducation",
            date: "2023/08/14",
          },
          {
            amount: 20,
            categorie: "Autres",
            date: "2023/08/14",
          },
        ],
      },
    ];

    const groupedPayments = fakeData[0].payments.reduce((acc, payment) => {
      if (!acc[payment.categorie]) {
        acc[payment.categorie] = 0;
      }
      acc[payment.categorie] += payment.amount;
      return acc;
    }, {});

    const groupedTransactions = fakeData[0].transactions.reduce((acc, transaction) => {
      acc += transaction.amount;
      return acc;
    }, 0);

    setData({
      payments: groupedPayments,
      transactions: groupedTransactions,
    });
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
    <div className="p-4 bg-white h-screen">
      {data ? (
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Statistics</h1>
          <div className="h-[50rem]">
            <h2>Payments and Transactions</h2>
            <Doughnut data={paymentChartData} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default StatisticsTable;