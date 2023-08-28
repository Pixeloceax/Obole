import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "./loader";
import Information from "./Information";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ isOpen, onClose, deconexion }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-3 m-4 z-50">
      <div className="bg-white rounded-lg p-6 border-gray border-2 shadow-lg">
        <h2 className="text-xl font-bold mb-4 border-b-2" onClick={deconexion}>
          Déconnexion
        </h2>
        <button
          className="mt-2 px-3 py-1 bg-white rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

function AccountOverview() {
  const [data, setData] = useState(null);
  const [transaction, setTransaction] = useState([]);
  const [payment, setPayment] = useState([]);
  let i = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_CONNECTION_STRING + `/user`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  });

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

  const formattedPayments = payment.map((payment) => `- ${payment.amount} €`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_CONNECTION_STRING + "/transaction",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTransaction(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const matchingTransactions = [];

  for (const transactions of transaction) {
    const destinationAccount = transactions.destinationAccount;
    if (parseInt(destinationAccount) === data.Account.accountNumber) {
      matchingTransactions.push(transactions);
    }
  }

  const formattedTransactions = matchingTransactions.map(
    (matchingTransactions) => `${matchingTransactions.amount} €`
  );

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    if (modalOpen === true) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    if (modalOpen === true) {
      setModalOpen(false);
    }
  };

  const deconexion = () => {
    localStorage.clear();
    window.location.href = "/lo=gin";
  };

  return (
    <div className="p-4 bg-white">
      {data ? (
        <div className="ml-5" onClick={closeModal}>
          <div className="flex justify-between">
            <h1 className="md:text-3xl text-2xl font-extrabold underline underline-offset-4">
              Bonjour,{" "}
              <span className="text-purple">
                {data && data.Information && data.Information.name}
              </span>
            </h1>
            <button onClick={openModal}>
              <FontAwesomeIcon icon={faUserCircle} className="text-5xl " />
            </button>
            <Modal
              isOpen={modalOpen}
              onClose={closeModal}
              deconexion={deconexion}
            />
          </div>
          <div className="lg:flex block justify-evenly">
            <div className="lg:w-[50%] mt-10 bg-purple rounded-3xl shadow-md p-8 w-full">
              <h1 className="text-white font-bold md:text-4xl text-xl md:mb-12 mb-6">
                Compte Courant
              </h1>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-white font-bold md:text-xl text-md">
                  {" "}
                  N° **** {data.Account.accountNumber.toString().slice(-4)}
                </h2>
                <p className="text-white font-bold md:text-3xl text-lg">
                  {data.Balance.balance} €
                </p>
              </div>
              <hr className="border-2 border-white mb-8" />
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex justify-between items-center">
                    <p className="text-white font-bold md:text-3xl text-xl">
                      CB VISA
                    </p>
                  </div>
                  <p className="text-white font-bold md:text-xl text-md md:mt-12 mt-8">
                    N° **** {data.Card[0].cardNumber.toString().slice(-4)}
                  </p>
                </div>
                <Link to="/dashboard/cartes">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-5xl text-white"
                  />
                </Link>
              </div>
            </div>
            <div className="lg:w-[40%] w-full mt-10 bg-black rounded-3xl shadow-md p-8">
              <h1 className="text-white font-bold md:text-4xl text-xl md:mb-12 mb-8 justify-center flex">
                Information
              </h1>
              <Information />
            </div>
          </div>
          <div className="lg:flex block justify-evenly">
            <div className="lg:w-[45%] w-full mt-10 bg-purple rounded-3xl shadow-md p-8">
              <div className="flex justify-center">
                <h1 className="text-white font-bold md:text-4xl text-xl md:mb-12 mb-8 flex-1 flex justify-center">
                  Livrets
                </h1>
                <Link to="/dashboard/epargne">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-5xl text-white"
                  />
                </Link>
              </div>
              <div className="flex justify-around flex-col md:flex-row">
                {data.SavingsAccount.map((livret, index) => (
                  <div
                    className={`flex items-center justify-center md:w-[50%] ${
                      index == 0
                        ? ""
                        : "md:border-r-2 border-b-2 md:border-b-0 border-white"
                    }`}
                  >
                    <div className="text-center">
                      <p className="text-white font-bold md:text-4xl text-xl mb-2">
                        {livret.type}
                      </p>
                      <p className="text-white font-bold md:text-4xl text-xl mb-4">
                        {livret.savingsBalance} €
                      </p>
                      <p className="text-white font-bold md:text-4xl text-xl mb-2">
                        Previsionelle
                      </p>
                      <div className="flex justify-between mb-4">
                        <p className="text-white font-bold md:text-4xl text-xl">
                          {livret.type === "A"
                            ? (2 / 100) * livret.savingsBalance
                            : (3 / 100) * livret.savingsBalance}{" "}
                          €
                        </p>
                        <p className="text-white font-bold md:text-4xl text-xl">
                          {livret.type === "A" ? "2%" : "3%"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-[45%] w-full mt-10 bg-black rounded-3xl shadow-md p-8">
              <div className="flex justify-center">
                <h1 className="text-white font-bold md:text-4xl text-xl md:mb-12 mb-8 flex-1 flex justify-center">
                  Transaction
                </h1>
                <Link to="/dashboard/transaction">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-5xl text-white"
                  />
                </Link>
              </div>
              <div className="flex justify-around">
                <div className="flex items-center justify-center w-[50%]">
                  <div className="text-center">
                    <p className="text-white font-bold md:text-4xl text-xl mb-2">
                      Gain
                    </p>
                    {formattedTransactions
                      .slice(0, 4)
                      .map((transaction, index) => (
                        <p
                          key={index}
                          className="text-white font-bold md:text-2xl text-lg mb-2"
                        >
                          {transaction}
                        </p>
                      ))}
                  </div>
                </div>
                <div className="flex items-center justify-center w-[50%] border-l-4 border-white">
                  <div className="text-center">
                    <p className="text-white font-bold md:text-4xl text-xl mb-2">
                      Deficit
                    </p>
                    {formattedPayments.slice(0, 4).map((payment, index) => (
                      <p
                        key={index}
                        className="text-white font-bold md:text-2xl text-lg mb-2"
                      >
                        {payment}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default AccountOverview;
