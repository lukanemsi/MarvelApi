'use client'
import Link from 'next/link';
import { UserAuth } from '../../context/AuthContext';
import { useState,useEffect } from 'react';

const Navbar = () => {
  const {user, googleSignIn, logout} = UserAuth();
  const [loading, setLoading] = useState(true);
  const handleSignIn = async () => {
    try{
      await googleSignIn()
    }catch(error){
      console.log(error)
    }
  }
  const handleSignOut = async () => {
    try{
      await logout()
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve,50));
      setLoading(false)
    }
    checkAuth();
  },[user])

 
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" legacyBehavior>
            <a className="text-white font-semibold">Comics</a>
          </Link>
        </div>
        {
          user && ( <div>
            <Link href="/pages/favorites" legacyBehavior>
              <a className="text-white font-semibold">Favorites</a>
            </Link>
          </div>)

        }
        {
        loading? null: (!user ? 
          (<div className='flex gap-4'>
            <div onClick={handleSignIn} className="text-white font-semibold cursor-pointer">
                Log In
            </div>
          </div>) : 
          (<div>
              <p className='text-white'>Welcome {user.displayName}</p>
              <p className='text-white cursor-pointer' onClick={handleSignOut}>Sign Out</p>
            </div>
          )
        )
        }
      
      </div>
    </nav>
  );
};

export default Navbar;
