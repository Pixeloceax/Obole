import React from "react";

function Transactions() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-medium mb-4">Recent Transactions</h2>
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-500">Payment Received</span>
          <span className="text-green-500 font-medium">$200</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-500">ATM Withdrawal</span>
          <span className="text-red-500 font-medium">-$100</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Online Purchase</span>
          <span className="text-red-500 font-medium">-$50</span>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
