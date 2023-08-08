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
        <h3 className="text-xl font-bold mb-4">Sécurité</h3>
        <h3 className="text-3xl font-bold mb-4">Sécurité de bout en bout</h3>
        <p className="text-lg">
          Gardez l'esprit tranquille grâce à nos systèmes de sécurité et nos
          partenaires de confiance
        </p>
        <div className="text-black md:flex hidden justify-center pt-10">
          <div className="w-[50%] bg-white rounded-lg p-10">
            <h3 className="text-xl font-bold mb-4">Sécurité</h3>
            <div className="flex justify-between">
              <p className="text-lg w-4/6">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
                culpa doloribus odio, distinctio quia consectetur? Ipsum enim
                cumque voluptas incidunt non veritatis corporis, natus,
                distinctio iure dolor provident vel. Sapiente.
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
        <h3 className="text-xl font-bold mb-4">Simplicité d'utilisation</h3>
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
            <h3 className="text-xl font-bold mb-4">
              Expérience bancaire simplifiée
            </h3>
            <div className="flex justify-between">
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
