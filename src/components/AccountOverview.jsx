import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import right_icon from "../assets/right-arrow.png";
import user from "../assets/user.png";

function AccountOverview() {
  const _id = sessionStorage.getItem("_id");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/dashboard?_id=${_id}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        console.log(response);
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
  console.log(data);

  // const numberLivret = data ? data.Livret.length : 0;

  return (
    <div className="p-6 bg-white">
      {data ? (
        <div className="ml-5">
          <div className="flex justify-between">
            <h1 className="text-3xl font-extrabold underline underline-offset-4">
              Bonjour,{" "}
              <span className="text-purple">{data.Information.nom}</span>
            </h1>
            <img src={user} alt="account" className="h-14" />
          </div>
          <div className="flex justify-evenly">
            <div class="w-[50%] mt-10 bg-purple rounded-3xl shadow-md p-8">
              <h1 class="text-white font-bold text-4xl mb-12">
                Compte Courant
              </h1>
              <div class="flex justify-between items-center mb-8">
                <h2 className="text-white font-bold text-xl">
                  {" "}
                  N° **** {data.Compte.compteNumber.toString().slice(-4)}
                </h2>
                <p class="text-white font-bold text-3xl">
                  {data.Solde.solde} €
                </p>
              </div>
              <hr class="border-2 border-white mb-8" />
              <div className="flex justify-between items-center">
                <div>
                  <div class="flex justify-between items-center">
                    <p class="text-white font-bold text-3xl">CB VISA</p>
                  </div>
                  <p class="text-white font-bold text-xl mt-12">
                    N° **** {data.Carte[0].carteNumber.toString().slice(-4)}
                  </p>
                </div>
                <Link to="/test">
                  <img src={right_icon} alt="icon" class="h-16" />
                </Link>
              </div>
            </div>
            <div class="w-[40%] mt-10 bg-black rounded-3xl shadow-md p-8">
              <h1 class="text-white font-bold text-4xl mb-12 justify-center flex">
                Information
              </h1>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div class="w-[45%] mt-10 bg-purple rounded-3xl shadow-md p-8">
              <div className="flex justify-center">
                <h1 class="text-white font-bold text-4xl mb-12 flex-1 flex justify-center">
                  Livrets
                </h1>
                <Link to="/test">
                  <img src={right_icon} alt="icon" class="h-16" />
                </Link>
              </div>
              {/* <div className="flex justify-around">
                <div class="flex items-center justify-center w-[50%]">
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
                    <wr class="border-2 border-white" />
                    <div class="flex items-center justify-center w-[50%]">
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
            <div class="w-[45%] mt-10 bg-black rounded-3xl shadow-md p-8">
              <h1 class="text-white font-bold text-4xl mb-12 justify-center flex">
                Transaction
              </h1>
              <div className="flex justify-around">
                <div class="flex items-center justify-center w-[50%]">
                  <div className="text-center">
                    <p className="text-white font-bold text-4xl mb-2">
                      A venir
                    </p>
                  </div>
                </div>
                <wr class="border-2 border-white" />
                <div class="flex items-center justify-center w-[50%]">
                  <div className="text-center">
                    <p className="text-white font-bold text-4xl mb-2">Fait</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AccountOverview;
