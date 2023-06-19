import React from "react";

import Navbar from "../components/Navbar";
import ViewCartes from "../components/ViewCartes";

const Cartes = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar className="fixed top-0 w-full z-50" />
      <div className="w-full overflow-y-scroll h-full">
        <ViewCartes />
      </div>
    </div>
  );
};

export default Cartes;
