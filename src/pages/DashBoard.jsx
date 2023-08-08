import React from "react";
import AccountOverview from "../components/AccountOverview";
import Navbar from "../components/Navbar";

const DashBoard = (isLoggedIn) => {
  if (isLoggedIn) {
  }
  return (
    <div className="bg-white h-screen">
      <div className="flex">
        <Navbar />
        <div className="w-full md:pl-40 pl-20">
          <AccountOverview />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
