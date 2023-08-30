import React from "react";

// Import components
import Navbar from "../components/Navbar";
import ViewMessage from "../components/ViewMessage";

const Message = () => {
  return (
    <div className="flex bg-white">
      <Navbar className="fixed top-0 w-full z-50" />
      <div className="w-full md:pl-40 pl-20">
        <ViewMessage />
      </div>
    </div>
  );
};

export default Message;
