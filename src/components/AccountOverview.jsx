import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AccountOverview() {
  const { compteNumber } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/dashboard/${compteNumber}`);
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, [compteNumber]);

  // Add a conditional rendering to handle the case where data is null
  if (!data) {
    return <div>Loading...</div>;
  }

  // Update the JSX code to use the `compteNumber` and `solde` values from the data
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1>Dashboard for Compte {data.compteNumber}</h1>
      <h2 className="text-xl font-medium mb-4">Account Overview</h2>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500">Account Balance</span>
        <span className="text-gray-900 font-medium">${data.solde}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-500">Credit Limit</span>
        <span className="text-gray-900 font-medium">$5,000</span>
      </div>
    </div>
  );
}

export default AccountOverview;
