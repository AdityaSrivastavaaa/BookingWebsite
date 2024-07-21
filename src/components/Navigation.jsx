import React from 'react';
import { Link } from "react-router-dom";
import BrandLogo from '../assets/brandlogo.svg';
import User from '../assets/user.png';

function Navigation() {
  return (
    <div>
      <header className='w-full sm:w-11/12 mx-auto bg-gray-500 text-white text-center py-4'>
        <span className='text-lg sm:text-xl font-sans'>Welcome to PlanAndTravel.com &hearts;</span>
      </header>
      <nav className='flex justify-between items-center w-full sm:w-11/12 mx-auto pt-5 sticky pb-4 px-5'>
        <div>
          <Link to="/">
            <img src={BrandLogo} alt="Brand Logo" className='h-8 sm:h-12' />
          </Link>
        </div>
        <div>
          <img src={User} alt="User" className='w-8 sm:w-10 border border-black rounded-full' />
        </div>
      </nav>
    </div>
  )
}

export default Navigation;
