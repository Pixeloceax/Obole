import React from 'react';

import Navbar from '../components/Navbar';
import ViewCartes from '../components/ViewCartes';

const Cartes = () => {
    return (
        <div className='flex'>
            <Navbar />
            <div className='w-full'>
                <ViewCartes />
            </div>
        </div>
    );
};

export default Cartes;