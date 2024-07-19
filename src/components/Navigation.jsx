import React from 'react'
import { Link } from "react-router-dom";
import BrandLogo from '../assets/brandlogo.svg';
import User from '../assets/user.png';
function Navigation() {
  return (
    <div>
      <header className='w-full bg-gray-500 text-white text-center py-4'>
        <span className='text-xl font-sans '>Welcome to PlanAndTravel.com  &hearts; </span>
      </header>
      <nav className='flex justify-between w-5/6 mx-auto pt-5 sticky pb-4'>
        <div>
          <Link to="/">
            <img src={BrandLogo} alt="Brand Logo" />
          </Link>
        </div>
        <div>
          <img src={User} alt="User" width={30} className='border border-black rounded-full' />
        </div>
      </nav>
    </div>
  )
}

export default Navigation
