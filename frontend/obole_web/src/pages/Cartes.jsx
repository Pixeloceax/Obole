import React from "react";

// Import components
import Navbar from "../components/Navbar";
import ViewCartes from "../components/ViewCartes";

const Cartes = () => {
  return (
    <div className="flex bg-white">
      <Navbar className="fixed top-0 w-full z-50" />
      <div className="w-full md:pl-40 pl-20">
        <ViewCartes />
      </div>
    </div>
  );
};

export default Cartes;
