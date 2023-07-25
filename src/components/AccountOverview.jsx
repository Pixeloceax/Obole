import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import right_icon from "../assets/right-arrow.png";
import user from "../assets/user.png";

import Loader from "./loader";

const Modal = ({ isOpen, onClose, deconexion }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-3 m-4 z-50">
      <div className="bg-white rounded-lg p-6 border-gray border-2 shadow-lg">
        <h2
          className="text-xl font-bold mb-4 border-b-2"
          onClick={deconexion}
        >
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
  const _id = sessionStorage.getItem("_id");
  const [data, setData] = useState(null);
  const [transaction, setTransaction] = useState([]);
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://obole-back.onrender.com/dashboard?_id=${_id}`
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
  }, [_id]);

  // if (!data) {
  //   const dataConf = {
  //     _id: "64bfb35c4de9f5b216b4f339",
  //     Information: {
  //       name: "Colas",
  //       lastName: "Renard",
  //       phone: "1234567890",
  //       email: "john.doe@example.com",
  //       gender: "Male",
  //       address: "123 Main Street",
  //       country: "FR",
  //       date_of_birth: {
  //         day: 10,
  //         month: 5,
  //         year: 1996,
  //       },
  //     },
  //     Account: {
  //       accountNumber: 373519802352.0,
  //       hashPassword:
  //         "$2b$10$9ddqPbLEzZ.LB7ip4IuP7erLvvcgczGDb1vd9kst/SLrACV7c9Y/e",
  //     },
  //     Card: [
  //       {
  //         cardNumber: 3539347942394868.0,
  //         expirationDate: "07/28",
  //         code: 6295,
  //         CCV: 171,
  //         locked: false,
  //         opposition: false,
  //         limit: 1000,
  //         used: 0,
  //         _id: "64bfb35c4de9f5b216b4f33a",
  //       },
  //     ],
  //     Balance: {
  //       balance: 1000,
  //     },
  //     SavingsAccount: [
  //       {
  //         type: "Jeune",
  //         savingsBalance: 1000,
  //         _id: "64bfb35c4de9f5b216b4f33b",
  //       },
  //       {
  //         type: "Jeune",
  //         savingsBalance: 1000,
  //         _id: "64bfb35c4de9f5b216b4f33b",
  //       },
  //     ],
  //     __v: {
  //       $numberInt: "0",
  //     },
  //   };
  //   setData(dataConf);
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _id = sessionStorage.getItem("_id");
        const response = await axios.post(
          "https://obole-back.onrender.com/paymentStatistics",
          { _id }
        );
        setPayment(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const formattedPayments = payment.map(
    (payment) => `- ${payment.payment.amount} €`
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _id = sessionStorage.getItem("_id");
        const response = await axios.post(
          "https://obole-back.onrender.com/transaction",
          {
            _id,
          }
        );
        setTransaction(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(transaction);

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
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="p-6 bg-white">
      {data ? (
        <div className="ml-5" onClick={closeModal}>
          <div className="flex justify-between">
            <h1 className="text-3xl font-extrabold underline underline-offset-4">
              Bonjour,{" "}
              <span className="text-purple">{data.Information.nom}</span>
            </h1>
            <button onClick={openModal}>
              <img src={user} alt="account" className="h-14" />
            </button>
            <Modal isOpen={modalOpen} onClose={closeModal} deconexion={() => {deconexion()}} />
          </div>
          <div className="flex justify-evenly">
            <div className="w-[50%] mt-10 bg-purple rounded-3xl shadow-md p-8">
              <h1 className="text-white font-bold text-4xl mb-12">
                Compte Courant
              </h1>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-white font-bold text-xl">
                  {" "}
                  N° **** {data.Account.accountNumber.toString().slice(-4)}
                </h2>
                <p className="text-white font-bold text-3xl">
                  {data.Balance.balance} €
                </p>
              </div>
              <hr className="border-2 border-white mb-8" />
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex justify-between items-center">
                    <p className="text-white font-bold text-3xl">CB VISA</p>
                  </div>
                  <p className="text-white font-bold text-xl mt-12">
                    N° **** {data.Card[0].cardNumber.toString().slice(-4)}
                  </p>
                </div>
                <Link to="/test">
                  <img src={right_icon} alt="icon" className="h-16" />
                </Link>
              </div>
            </div>
            <div className="w-[40%] mt-10 bg-black rounded-3xl shadow-md p-8">
              <h1 className="text-white font-bold text-4xl mb-12 justify-center flex">
                Information
              </h1>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div className="w-[45%] mt-10 bg-purple rounded-3xl shadow-md p-8">
              <div className="flex justify-center">
                <h1 className="text-white font-bold text-4xl mb-12 flex-1 flex justify-center">
                  Livrets
                </h1>
                <Link to="/test">
                  <img src={right_icon} alt="icon" className="h-16" />
                </Link>
              </div>
              <div className="flex justify-around">
                {data.SavingsAccount.map((livret, index) => (
                  <div
                    className={`flex items-center justify-center w-[50%] ${
                      index === 0 ? "border-r-2 border-white" : ""
                    }`}
                  >
                    {console.log(livret.type)}
                    <div className="text-center">
                      <p className="text-white font-bold text-4xl mb-2">
                        {livret.type}
                      </p>
                      <p className="text-white font-bold text-4xl mb-4">
                        {livret.savingsBalance} €
                      </p>
                      <p className="text-white font-bold text-4xl mb-2">
                        Previsionelle
                      </p>
                      <div className="flex justify-between mb-4">
                        <p className="text-white font-bold text-4xl">
                          {livret.type === "A"
                            ? (2 / 100) * livret.savingsBalance
                            : (3 / 100) * livret.savingsBalance}{" "}
                          €
                        </p>
                        <p className="text-white font-bold text-4xl">
                          {livret.type === "A" ? "2%" : "3%"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[45%] mt-10 bg-black rounded-3xl shadow-md p-8">
              <h1 className="text-white font-bold text-4xl mb-12 justify-center flex">
                Transaction
              </h1>
              <div className="flex justify-around">
                <div className="flex items-center justify-center w-[50%]">
                  <div className="text-center">
                    <p className="text-white font-bold text-4xl mb-2">Gain</p>
                  </div>
                </div>
                <wr className="border-2 border-white" />
                <div className="flex items-center justify-center w-[50%]">
                  <div className="text-center">
                    <p className="text-white font-bold text-4xl mb-2">
                      Deficit
                    </p>
                    {formattedPayments.slice(0, 4).map((payment, index) => (
                      <p
                        key={index}
                        className="text-white font-bold text-2xl mb-2"
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
