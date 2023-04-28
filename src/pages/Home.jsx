import React from 'react';

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex justify-between items-center bg-white py-4 px-6">
        <h1 className="text-gray-800 font-bold text-3xl">My Bank</h1>
        <nav>
          <ul className="flex">
            <li className="mx-2">
              <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
            </li>
            <li className="mx-2">
              <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
            </li>
            <li className="mx-2">
              <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100">
        <div className="container mx-auto py-10">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Invest in your future</h2>
          <p className="mb-4 text-gray-700">With My Bank, you can invest your money in a wide range of funds, stocks, and cryptocurrencies with just a few clicks. Our platform is secure, transparent, and easy to use, so you can start building your portfolio today.</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">Open an Account</button>

          <h3 className="text-2xl font-bold my-8 text-gray-800">Why choose My Bank?</h3>
          <div className="flex flex-col md:flex-row md:justify-between mb-8">
            <div className="w-full md:w-1/3 p-4 bg-white rounded-md shadow-md">
              <h4 className="text-lg font-bold mb-2 text-gray-800">Easy to use</h4>
              <p className="text-gray-700">Our platform is designed to be user-friendly and intuitive, so you can manage your investments with ease.</p>
            </div>
            <div className="w-full md:w-1/3 p-4 bg-white rounded-md shadow-md mt-4 md:mt-0">
              <h4 className="text-lg font-bold mb-2 text-gray-800">Secure and transparent</h4>
              <p className="text-gray-700">We use state-of-the-art security measures and provide full transparency into your investments, so you can trust us with your money.</p>
            </div>
            <div className="w-full md:w-1/3 p-4 bg-white rounded-md shadow-md mt-4 md:mt-0">
              <h4 className="text-lg font-bold mb-2 text-gray-800">Diverse investment options</h4>
              <p className="text-gray-700">We offer a wide range of investment options, from traditional stocks and funds to cutting-edge cryptocurrencies, so you can build a portfolio that suits your needs.</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold my-8 text-gray-800">What our customers say</h3>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="w-full md:w-1/3 p-4 bg-white rounded-md shadow-md">
<blockquote className="text-lg italic text-gray-700 mb-4">"I've been using My Bank for over a year now and I'm extremely happy with the platform. It's easy to use, the fees are reasonable, and the customer support is excellent."</blockquote>
<cite className="text-gray-800 font-bold">John Smith</cite>
<p className="text-gray-700">Accountant</p>
</div>
<div className="w-full md:w-1/3 p-4 bg-white rounded-md shadow-md mt-4 md:mt-0">
<blockquote className="text-lg italic text-gray-700 mb-4">"My Bank is the perfect platform for new investors like myself. The interface is simple and easy to use, and the investment options are diverse and accessible."</blockquote>
<cite className="text-gray-800 font-bold">Jane Doe</cite>
<p className="text-gray-700">Entrepreneur</p>
</div>
<div className="w-full md:w-1/3 p-4 bg-white rounded-md shadow-md mt-4 md:mt-0">
<blockquote className="text-lg italic text-gray-700 mb-4">"I was skeptical about investing in cryptocurrencies, but My Bank made it easy and straightforward. I've seen great returns on my investments and I'm excited to continue using the platform."</blockquote>
<cite className="text-gray-800 font-bold">Mark Johnson</cite>
<p className="text-gray-700">Software Engineer</p>
</div>
</div>
</div>
</main>

  {/* Footer */}
  <footer className="bg-gray-800 text-white py-4 px-6">
    <p>&copy; 2023 My Bank</p>
  </footer>
</div>

);
};

export default HomePage;