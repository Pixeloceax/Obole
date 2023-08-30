import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-purple_clair py-6 fixed w-full bg-opacity-75 backdrop-blur">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-5xl font-bold text-white">Obole</h1>
          <nav>
            <Link
              to="/register"
              className="text-black text-xl font-bold mr-4 bg-white px-4 py-2 rounded"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-white text-xl font-bold mr-4 bg-black px-4 py-2 rounded"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto flex-grow px-4 py-20 text-center pt-52">
        <h2 className="text-6xl font-extrabold mb-6">La banque de demain</h2>
      </main>

      <section className="bg-black text-white py-20 text-center justify-center items-center">
        <h3 className="text-6xl font-bold mb-4">Sécurité</h3>
        <h3 className="text-3xl font-bold mb-4">Sécurité de bout en bout</h3>
        <p className="text-lg">
          Gardez l'esprit tranquille grâce à nos systèmes de sécurité et nos
          partenaires de confiance
        </p>
        <div className="text-black md:flex hidden justify-center pt-10">
          <div className="w-[50%] bg-white rounded-lg p-10">
            <div className="flex justify-between items-center">
              <p className="text-lg w-4/6">
                Nous comprenons l'importance de protéger vos données. Nos
                systèmes de sécurité de pointe assurent que vos informations
                restent confidentielles et sécurisées. Nous travaillons avec des
                partenaires de confiance pour garantir la meilleure expérience
                possible.
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
                className="h-36 w-36"
              >
                <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-center justify-center items-center">
        <h3 className="text-6xl font-bold mb-4">Simplicité d'utilisation</h3>
        <h3 className="text-3xl font-bold mb-4">
          Expérience bancaire intuitive
        </h3>
        <p className="text-lg">
          Avec notre application conviviale, gérez vos finances en toute
          simplicité. Dites adieu aux complications, simplifiez votre expérience
          bancaire.
        </p>
        <div className="text-white justify-center pt-10 hidden md:flex">
          <div className="w-[50%] bg-black rounded-lg p-10">
            <div className="flex justify-between items-center">
              <p className="text-lg w-4/6">
                Notre application intuitive vous permet de gérer vos finances en
                quelques clics. Plus besoin de complications, simplifiez votre
                expérience bancaire.
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
                className="h-36 w-36"
              >
                <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-20 text-center justify-center items-center">
        <h3 className="text-6xl font-bold mb-4">Pas de Frais</h3>
        <h3 className="text-3xl font-bold mb-4">Sécurité de bout en bout</h3>
        <p className="text-lg">
          Notre banque ne facture pas de frais. Nous ne facturons pas de frais
          de gestion, de frais de découvert ou de frais de carte.
        </p>
        <div className="text-black md:flex hidden justify-center pt-10">
          <div className="w-[50%] bg-white rounded-lg p-10">
            <div className="flex justify-between items-center">
              <p className="text-lg w-4/6">
                Nous comprenons l'importance de ne pas facturer de frais. Notre
                banque ne facture pas de frais. Nous ne facturons pas de frais
                de gestion, de frais de découvert ou de frais de carte.
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                className="h-36 w-36"
                viewBox="0 0 24 24"
              >
                <path d="M8,16a1,1,0,0,0-2,0,5.006,5.006,0,0,0,5,5v1a1,1,0,0,0,2,0V21a5,5,0,0,0,0-10V5a3,3,0,0,1,3,3,1,1,0,0,0,2,0,5.006,5.006,0,0,0-5-5V2a1,1,0,0,0-2,0V3a5,5,0,0,0,0,10v6A3,3,0,0,1,8,16Zm5-3a3,3,0,0,1,0,6ZM8,8a3,3,0,0,1,3-3v6A3,3,0,0,1,8,8Z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-center justify-center items-center">
        <h3 className="text-6xl font-bold mb-4">Investissement</h3>
        <h3 className="text-3xl font-bold mb-4">Investir en toute securiter</h3>
        <p className="text-lg">
          L'investissement est un jeu d'enfant avec notre application intuitive.
          Investissez dans les actions, les obligations et les fonds
        </p>
        <div className="text-white justify-center pt-10 hidden md:flex">
          <div className="w-[50%] bg-black rounded-lg p-10">
            <div className="flex justify-between items-center">
              <p className="text-lg w-4/6">
                Notre application intuitive vous permet de gérer vos finances en
                quelques clics. Plus besoin de complications, simplifiez votre
                expérience bancaire.
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-36 w-36"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 21H21M3 18H21M5.82333 3.00037C6.2383 3.36683 6.5 3.90285 6.5 4.5C6.5 5.60457 5.60457 6.5 4.5 6.5C3.90285 6.5 3.36683 6.2383 3.00037 5.82333M5.82333 3.00037C5.94144 3 6.06676 3 6.2 3H17.8C17.9332 3 18.0586 3 18.1767 3.00037M5.82333 3.00037C4.94852 3.00308 4.46895 3.02593 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3.02593 4.46895 3.00308 4.94852 3.00037 5.82333M3.00037 5.82333C3 5.94144 3 6.06676 3 6.2V11.8C3 11.9332 3 12.0586 3.00037 12.1767M3.00037 12.1767C3.36683 11.7617 3.90285 11.5 4.5 11.5C5.60457 11.5 6.5 12.3954 6.5 13.5C6.5 14.0971 6.2383 14.6332 5.82333 14.9996M3.00037 12.1767C3.00308 13.0515 3.02593 13.531 3.21799 13.908C3.40973 14.2843 3.71569 14.5903 4.09202 14.782C4.46895 14.9741 4.94852 14.9969 5.82333 14.9996M5.82333 14.9996C5.94144 15 6.06676 15 6.2 15H17.8C17.9332 15 18.0586 15 18.1767 14.9996M21 12.1771C20.6335 11.7619 20.0973 11.5 19.5 11.5C18.3954 11.5 17.5 12.3954 17.5 13.5C17.5 14.0971 17.7617 14.6332 18.1767 14.9996M21 12.1771C21.0004 12.0589 21 11.9334 21 11.8V6.2C21 6.06676 21 5.94144 20.9996 5.82333M21 12.1771C20.9973 13.0516 20.974 13.5311 20.782 13.908C20.5903 14.2843 20.2843 14.5903 19.908 14.782C19.5311 14.9741 19.0515 14.9969 18.1767 14.9996M20.9996 5.82333C20.6332 6.2383 20.0971 6.5 19.5 6.5C18.3954 6.5 17.5 5.60457 17.5 4.5C17.5 3.90285 17.7617 3.36683 18.1767 3.00037M20.9996 5.82333C20.9969 4.94852 20.9741 4.46895 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.5311 3.02593 19.0515 3.00308 18.1767 3.00037M14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="bg-black py-6">
          <div className="container mx-auto flex justify-center items-center px-4">
            <h1 className="text-5xl font-bold text-white">Obole</h1>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
