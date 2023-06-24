import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-purple_clair py-6">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-5xl font-bold text-white">Obole</h1>
          <nav>
            <Link
              to="/register"
              className="text-white text-xl font-bold mr-4 hover:text-purple_foncer"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-white text-xl font-bold mr-4 hover:text-purple_foncer"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto flex-grow px-4 py-12 text-center">
        <h2 className="text-4xl font-bold mb-6">Welcome to Your Bank</h2>
        <p className="text-lg mb-6">
          We're redefining online banking with our innovative approach and
          seamless user experience.
        </p>
        <p className="text-lg mb-6">
          Manage your finances, make secure transactions, and stay in control of
          your money, all in one place.
        </p>
      </main>

      <section className="bg-purple flex-grow py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">
            Why Choose Your Bank?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Seamless Online Banking
              </h3>
              <p className="text-lg text-white">
                Experience a seamless online banking service with advanced
                features and a user-friendly interface.
              </p>
            </div>
            <div className="bg-black rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Secure Transactions
              </h3>
              <p className="text-lg text-white">
                Rest assured that your transactions are protected with
                industry-standard security measures and protocols.
              </p>
            </div>
            <div className="bg-black rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                Personalized Experience
              </h3>
              <p className="text-lg text-white">
                Enjoy a personalized banking experience tailored to your needs
                and preferences.
              </p>
            </div>
            <div className="bg-black rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">
                24/7 Customer Support
              </h3>
              <p className="text-lg text-white">
                Get round-the-clock support from our dedicated customer service
                team, ready to assist you at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
