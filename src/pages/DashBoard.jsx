import React from 'react';
import AccountOverview from '../components/AccountOverview';
import Transactions from '../components/Transactions';


const DashBoard = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between py-6">
            <div className="md:w-1/4">
              <AccountOverview />
            </div>
            <div className="md:w-3/4">
              <Transactions />
            </div>
          </div>
        </div>
      </div>
    );
};

export default DashBoard;