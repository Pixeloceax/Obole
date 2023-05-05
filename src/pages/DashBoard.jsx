import React from "react";
import AccountOverview from "../components/AccountOverview";
import Transactions from "../components/Transactions";
import Navbar from "../components/Navbar";

const DashBoard = (isLoggedIn) => {
  if (isLoggedIn) {
  }
  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex">
        <Navbar />
        <div className="w-full">
          <AccountOverview />
        </div>
        <div className="w-3/4 ml-64">
          <Transactions />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
