import React from 'react'
import { Link } from "react-router-dom";
import BrandLogo from '../assets/brandlogo.svg';
import User from '../assets/user.png';
function Navigation() {
  return (
    <div>
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
