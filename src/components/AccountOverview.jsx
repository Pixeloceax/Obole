import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

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

  console.log(data)



  return (
    <div className="p-6 bg-white">
      {data ? (
        <div className="ml-5">
          <h1 className="text-3xl">Bonjour, {data.Information.nom}</h1>
          <div class="w-[40%] mt-10 bg-purple rounded-3xl shadow-md p-8">
            <h1 class="text-white font-bold text-4xl mb-12">Compte Courant</h1>
            <div class="flex justify-between items-center mb-8">
              <h2 class="text-white font-bold text-xl">N° **** 1234</h2>
              <p class="text-white font-bold text-3xl">10 000€</p>
            </div>
            <hr class="border-2 border-white mb-8" />
              <div class="flex justify-between items-center">
                <p class="text-white font-bold text-3xl">CB VISA</p>
                <img src="path/to/icon" alt="icon" class="w-8 h-16" />
              </div>
              <p class="text-white font-bold text-xl mt-12">N° **** 1234</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AccountOverview;
