import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import Loader from "./loader";

const ViewStatistic = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState("week");
  const [selectedPaymentType, setSelectedPaymentType] = useState("all");
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _id = sessionStorage.getItem("_id");
        const response = await axios.post(
          "https://obole-back.onrender.com/paymentStatistics",
          { _id }
        );
        const transformedData = transformResponse(response.data);
        setData(transformedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      let filteredData = data;

      const labels = filteredData.map((item) => item.type);
      const amounts = filteredData.map((item) => item.amount);

      const calculatedTotalAmount = filteredData.reduce(
        (accumulator, item) => accumulator + item.amount,
        0
      );
      setTotalAmount(calculatedTotalAmount);

      const colors = filteredData.map((item) => {
        switch (item.type) {
          case "Loyer":
            return "#FF6384";
          case "Nourriture":
            return "#36A2EB";
          case "Vêtements":
            return "#FFCE56";
          case "Transport":
          case "Santé":
          case "Loisirs":
          case "Éducation":
          case "Autres":
            return "#FFCE56";
          default:
            return "#FFCE56";
        }
      });

      Chart.register(...registerables);

      const chartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              data: amounts,
              backgroundColor: colors,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: "bottom",
          },
        },
      });

      chartRef.current.chart = chartInstance;
    }
  }, [data, selectedDateRange, selectedPaymentType]);

  const transformResponse = (response) => {
    const transformedData = [];
    const groupedData = {};

    response.forEach((item) => {
      const paymentType = item.payment.type;

      if (!groupedData[paymentType]) {
        groupedData[paymentType] = {
          _id: `payment${transformedData.length + 1}`,
          date: new Date(item.payment.date).toISOString().slice(0, 10),
          type: paymentType,
          amount: item.payment.amount,
        };
        transformedData.push(groupedData[paymentType]);
      } else {
        groupedData[paymentType].amount += item.payment.amount;
      }
    });

    return transformedData;
  };

  const handleMonthClick = (month) => () => {
    setSelectedMonth(month);
  };

  const getLastSixMonthsInFrench = () => {
    const monthsInFrench = [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ];
    const currentDate = new Date();
    const lastSixMonths = [];

    for (let i = 5; i >= 0; i--) {
      const monthIndex = currentDate.getMonth() - i;
      const month =
        monthsInFrench[monthIndex >= 0 ? monthIndex : 12 + monthIndex];
      lastSixMonths.push(month);
    }

    return lastSixMonths;
  };

  const lastSixMonths = getLastSixMonthsInFrench().reverse();

  return (
    <div className="flex justify-center h-full">
      {data.length !== 0 ? (
        <div className="overflow-hidden self-center">
          <div className="flex justify-center mb-10">
            {lastSixMonths.map((month, index) => (
              <div key={month} className="mr-4">
                <input
                  type="radio"
                  id={`month-${index}`}
                  name="month"
                  value={month}
                  className="hidden peer"
                  defaultChecked={index === 0}
                />
                <label
                  htmlFor={`month-${index}`}
                  className="inline-flex items-center justify-between w-full p-5 rounded-lg cursor-pointer text-gray-500 peer-checked:text-white bg-black"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">{month}</div>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center w-[40vw] h-[40vw] relative">
            <p className="absolute font-bold text-3xl">{totalAmount} €</p>
            <canvas ref={chartRef} className="w-full h-full" />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ViewStatistic;
