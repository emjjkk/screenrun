'use client'
import { LuFlame, LuArrowRight, LuPlus, LuPlay, LuSearch, LuMenu } from 'react-icons/lu'
import { useState } from 'react';

export default function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return(
        <>
            <header className="h-[10dvh] flex items-center justify-between px-4 md:px-12 sticky top-0 bg-black z-50 shadow-lg">
                {/* Desktop Left Side */}
                <div className="hidden md:flex items-center w-1/3">
                    <img src="/screenrun.png" alt="Screenrun" className="w-6 h-auto mr-3" />
                    <nav className="flex items-center">
                        <a href="#" className="mx-2 text-sm text-white">Home</a>
                        <a href="#" className="mx-2 text-sm text-white">TV Shows</a>
                        <a href="#" className="mx-2 text-sm text-white">Movies</a>
                        <a href="#" className="mx-2 text-sm text-white">People</a>
                        <a href="#" className="mx-2 text-sm text-white">News</a>
                    </nav>
                </div>
                
                {/* Mobile Left Side - Logo and Menu Button */}
                <div className="flex md:hidden items-center">
                    <img src="/screenrun.png" alt="Screenrun" className="w-6 h-auto mr-3" />
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                        <LuMenu size={24} />
                    </button>
                </div>
                
                {/* Search Bar - Center */}
                <div className="flex items-center justify-center">
                    <button className="w-[150px] md:w-[300px] bg-slate-500 flex justify-center items-center px-2 py-1 rounded-lg">
                        <LuSearch className='mr-2'/>Search...
                    </button>
                </div>
                
                {/* Desktop Right Side */}
                <div className="hidden md:flex items-center w-1/3 justify-end">
                    <a href="#" className="mx-2 text-sm text-white">Support</a>
                    <a href="#" className="mx-2 text-sm text-white">Contribute</a>
                    <a href="#" className="ml-2 mr-5 text-sm text-white">Login</a>
                    <button className="px-2 py-1 bg-white rounded-lg">Create an account</button>
                </div>
                
                {/* Mobile Right Side - Account Button */}
                <div className="flex md:hidden items-center">
                    <button className="px-2 py-1 bg-white rounded-lg">Sign In</button>
                </div>
                
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-[10dvh] left-0 w-full bg-black p-4 flex flex-col space-y-4 border-t border-gray-800">
                        <a href="#" className="text-white">Home</a>
                        <a href="#" className="text-white">TV Shows</a>
                        <a href="#" className="text-white">Movies</a>
                        <a href="#" className="text-white">People</a>
                        <a href="#" className="text-white">News</a>
                        <a href="#" className="text-white">Support</a>
                        <a href="#" className="text-white">Contribute</a>
                        <a href="#" className="text-white">Login</a>
                    </div>
                )}
            </header>
        </>
    )
}