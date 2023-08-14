import React from "react";

import Navbar from "../components/Navbar";
import ViewStatistic from "../components/ViewStatistic";

const Statistic = () => {
  return (
    <div className="flex bg-white">
      <Navbar className="fixed top-0 w-full z-50" />
      <div className="w-full md:pl-40 pl-20">
        <ViewStatistic />
      </div>
    </div>
  );
};

export default Statistic;
