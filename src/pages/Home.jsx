import React from "react";

const Home = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Welcome to Bank Import</h1>
        <p>
          We help you easily import your banking transactions into your favorite
          accounting software.
        </p>
        <button>Get Started</button>
      </main>
      <footer>
        <p>Copyright © 2023 Bank Import</p>
      </footer>
    </div>
  );
};

export default Home;
