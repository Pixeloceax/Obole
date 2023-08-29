import React from "react";

// Import components
import Navbar from "../components/Navbar";
import ViewDashBoard from "../components/ViewDashBoard";

const DashBoard = ({ isLoggedIn }) => {
  if (isLoggedIn) {
  }

  return (
    <div className="bg-white h-screen">
      <Navbar className="fixed top-0 w-full z-50" />
      <div className="w-full md:pl-40 pl-20">
        <ViewDashBoard />
      </div>
    </div>
  );
};

export default DashBoard;
