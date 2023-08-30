import React from "react";

// Import components
import Navbar from "../components/Navbar";
import ViewSavings from "../components/ViewSavings";

const Epargne = () => {
  return (
    <div className="flex bg-white">
      <Navbar className="fixed top-0 w-full z-50" />
      <div className="w-full md:pl-40 pl-20">
        <ViewSavings />
      </div>
    </div>
  );
};

export default Epargne;
