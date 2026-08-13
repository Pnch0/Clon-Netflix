import React from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';

function MainLayout(){

    return(
        <>
        <div className="Main-Layout">
            <Navbar />

            <main className='Content'>
            <Outlet />
            </main>
        </div>
        </>
    )
}

export default MainLayout;