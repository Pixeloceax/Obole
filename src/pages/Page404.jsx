import React from 'react';

// images
import Logo from '../assets/Logo_black_bg_transparent.png';

const Page404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <img src={Logo} alt="logo" className='h-72' />
            <h1 className="text-4xl font-bold text-gray-700 mb-4">404 Page Not Found</h1>
            <p className="text-gray-500 text-lg">The page you're looking for doesn't exist.</p>
            <a href="/" className="text-indigo-500 hover:text-indigo-600 mt-8">Go back to home</a>
        </div>
    );
};

export default Page404;