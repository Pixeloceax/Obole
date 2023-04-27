import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import right_icon from "../assets/right-arrow.png";
import user from "../assets/user.png";

function AccountOverview() {
  const _id = sessionStorage.getItem("_id")
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/dashboard?_id=${_id}`);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        console.log(response)
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [_id]);

  return (
    <div className="p-6 bg-white">
      {data ? (
        <div className="ml-5">
          <div className="flex justify-between">
            <h1 className="text-3xl font-extrabold underline underline-offset-4">Bonjour, <span className="text-purple">{data.Information.nom}</span></h1>
            <img src={user} alt="account" className="h-14" />
          </div>
          <div className="flex justify-evenly">
            <div class="w-[50%] mt-10 bg-purple rounded-3xl shadow-md p-8">
              <h1 class="text-white font-bold text-4xl mb-12">Compte Courant</h1>
              <div class="flex justify-between items-center mb-8">
                <h2 className="text-white font-bold text-xl"> N° **** {(data.Compte.compteNumber).toString().slice(-4)}</h2>
                <p class="text-white font-bold text-3xl">{data.Solde.solde} €</p>
              </div>
              <hr class="border-2 border-white mb-8" />
              <div className="flex justify-between items-center">
                <div>
                  <div class="flex justify-between items-center">
                    <p class="text-white font-bold text-3xl">CB VISA</p>
                  </div>
                  <p class="text-white font-bold text-xl mt-12">N° **** {(data.Carte[0].carteNumber).toString().slice(-4)}</p>
                </div>
                <Link to="/test">
                  <img src={right_icon} alt="icon" class="h-16" />
                </Link>
              </div>
            </div>
            <div class="w-[40%] mt-10 bg-black rounded-3xl shadow-md p-8">
              <h1 class="text-white font-bold text-4xl mb-12 justify-center flex">Information</h1>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div class="w-[50%] mt-10 bg-purple rounded-3xl shadow-md p-8">
              <div className="flex justify-center">
                <h1 class="text-white font-bold text-4xl mb-12 flex-1 flex justify-center">Livrets</h1>
                <Link to="/test">
                  <img src={right_icon} alt="icon" class="h-16" />
                </Link>
              </div>

              <div className="flex">
                <div class="flex justify-between items-center mb-8">
                  <h2 className="text-white font-bold text-xl"> N° **** {(data.Compte.compteNumber).toString().slice(-4)}</h2>
                  <p class="text-white font-bold text-3xl">{data.Solde.solde} €</p>
                </div>
                <wr class="border-2 border-white mb-8" />
                <div className="flex justify-between items-center">
                  <div>
                    <div class="flex justify-between items-center">
                      <p class="text-white font-bold text-3xl">CB VISA</p>
                    </div>
                    <p class="text-white font-bold text-xl mt-12">N° **** {(data.Carte[0].carteNumber).toString().slice(-4)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-[40%] mt-10 bg-black rounded-3xl shadow-md p-8">
              <h1 class="text-white font-bold text-4xl mb-12 justify-center flex">Information</h1>
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
