import React from 'react';

import Navbar from '../components/Navbar';
import ViewStatistic from '../components/ViewStatistic';

const Statistic = () => {
    return (
        <div className="flex h-screen overflow-hidden">
      <Navbar className="fixed top-0 w-full z-50" />
      <div className="w-full overflow-y-scroll h-full">
        <ViewStatistic />
      </div>
    </div>
    );
};

export default Statistic;