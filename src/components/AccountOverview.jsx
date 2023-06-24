import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import right_icon from "../assets/right-arrow.png";
import user from "../assets/user.png";

import Loader from "./loader";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-20 right-3 m-4 z-50">
      <div className="bg-white rounded-lg p-6 border-gray border-2 shadow-lg">
        <h2 className="text-xl font-bold mb-4 border-b-2 pr-16">Mon Compte</h2>
        <h2 className="text-xl font-bold mb-4 border-b-2">Parametre</h2>
        <h2 className="text-xl font-bold mb-4 border-b-2">Déconnexion</h2>
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

  //! si on veux test data sans db
  // if (!data) {
  //   const dataConf = {
  //     "Information": {
  //       "nom": "Colos",
  //       "prenom": "Ranard",
  //       "tel": "0624348782",
  //       "email": "2@gmail.com",
  //       "genre": "male",
  //       "adresse": "365 rue des pyrennes"
  //     },
  //     "Compte": {
  //       "compteNumber": 372709220879,
  //       "hashpassword": "737f2ddac3a6894264adf67313f9c6c08705345c8eed1101651e8072f10a094c"
  //     },
  //     "Solde": {
  //       "solde": 1000
  //     },
  //     "_id": "644922f53561216e0014d659",
  //     "Carte": [
  //       {
  //         "verrouiller": false,
  //         "opposition": false,
  //         "_id": "644922f53561216e0014d65a",
  //         "carteNumber": 8945198484733698,
  //         "dateExpiration": "04/28",
  //         "code": 2220,
  //         "CCV": 253,
  //         "plafond": 200
  //       }
  //     ],
  //     "Livret": [{
  //       "_id": "644bb6ed89d2e0a984392983",
  //       "type": "A",
  //       "soldeLivret": 1000
  //     }],
  //     "__v": 0
  //   }
  //   setData(dataConf)
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
    setModalOpen(false);
  };

  return (
    <div className="p-6 bg-white">
      {data ? (
        <div className="ml-5">
          <div className="flex justify-between">
            <h1 className="text-3xl font-extrabold underline underline-offset-4">
              Bonjour,{" "}
              <span className="text-purple">{data.Information.nom}</span>
            </h1>
            <button onClick={openModal}>
              <img src={user} alt="account" className="h-14" />
            </button>
            <Modal isOpen={modalOpen} onClose={closeModal} />
          </div>
          <div className="flex justify-evenly">
            <div className="w-[50%] mt-10 bg-purple rounded-3xl shadow-md p-8">
              <h1 className="text-white font-bold text-4xl mb-12">
                Compte Courant
              </h1>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-white font-bold text-xl">
                  {" "}
                  N° **** {data.Compte.compteNumber.toString().slice(-4)}
                </h2>
                <p className="text-white font-bold text-3xl">
                  {data.Solde.solde} €
                </p>
              </div>
              <hr className="border-2 border-white mb-8" />
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex justify-between items-center">
                    <p className="text-white font-bold text-3xl">CB VISA</p>
                  </div>
                  <p className="text-white font-bold text-xl mt-12">
                    N° **** {data.Carte[0].carteNumber.toString().slice(-4)}
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
              {/* <div className="flex justify-around">
                <div className="flex items-center justify-center w-[50%]">
                  <div className="text-center">
                    <p className="text-white font-bold text-4xl mb-2">
                      {data.Livret[0].type}
                    </p>
                    <p className="text-white font-bold text-4xl mb-4">
                      {data.Livret[0].soldeLivret} €
                    </p>
                    <p className="text-white font-bold text-4xl mb-2">
                      Previsionelle
                    </p>
                    <div className="flex justify-between mb-4">
                      <p className="text-white font-bold text-4xl">
                        {data.Livret[0].type === "A"
                          ? (2 / 100) * data.Livret[0].soldeLivret
                          : (3 / 100) * data.Livret[0].soldeLivret}{" "}
                        €
                      </p>
                      <p className="text-white font-bold text-4xl">
                        {data.Livret[0].type === "A" ? "2%" : "3%"}
                      </p>
                    </div>
                  </div>
                </div>
                {numberLivret > 1 && (
                  <>
                    <wr className="border-2 border-white" />
                    <div className="flex items-center justify-center w-[50%]">
                      <div className="text-center">
                        <p className="text-white font-bold text-4xl mb-2">
                          {data.Livret[1].type}
                        </p>
                        <p className="text-white font-bold text-4xl mb-4">
                          XXXX€
                        </p>
                        <p className="text-white font-bold text-4xl mb-2">
                          Previsionelle
                        </p>
                        <div className="flex justify-between mb-4">
                          <p className="text-white font-bold text-4xl">XX,X€</p>
                          <p className="text-white font-bold text-4xl">X%</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div> */}
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
