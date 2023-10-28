"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { AppContext } from 'app/_providers/AppProvider';
import { AppContextType } from 'app/_type/AppType';
// import { usePathname } from 'next/navigation'

const Navbar: React.FC = () => {
  // const pathName = usePathname().split('/')[1];
  const { appState } = useContext(AppContext) as AppContextType;

  const pathName: string = '';
  
  return (
    <div className="w-full h-14 bg-white grid grid-cols-6 gap-4 fixed z-50 shadow-md">
      <div className="col-span-2 flex items-center">
        <div className="flex items-center ml-2">
          <div className="h-10 text-primary">
            <Link href="/">
              <i className="fab fa-facebook" style={{ fontSize: 40 }}></i>
            </Link>
          </div>
          <div className="h-10">
            <input
              placeholder="Search Facebook"
              className="bg-gray-100 rounded-full h-full focus:outline-none ml-2 px-3 pr-4"
            />
          </div>
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center space-x-2">
        <Link href="/home">
          <div className="w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <div className="w-14 h-auto relative flex items-center justify-center">
              <div
                className={`${
                  pathName === '' || undefined
                    ? 'text-gray-400'
                    : 'text-black'
                }`}
              >
                <i className="text-2xl fas fa-home"></i>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/watch">
          <div className="w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <div className="w-14 h-auto relative flex items-center justify-center">
              <div className="absolute bg-red-500 text-white text-xs font-bold px-1 rounded-lg top-0 right-0">
                9+
              </div>
              <div
                className={`${
                  pathName === 'watch' ? 'text-primary' : 'text-black'
                }`}
              >
                <i className="text-2xl fas fa-tv"></i>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/marketplace">
          <div className="w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <div className="w-14 h-auto relative flex items-center justify-center">
              <div className="hidden absolute bg-red-500 text-white text-xs font-bold px-1 rounded-lg top-0 right-0">
                9+
              </div>
              <div
                className={`${
                  pathName === 'marketplace' ? 'text-white' : 'text-black'
                }`}
              >
                <i className="text-2xl fas fa-store"></i>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/groups">
          <div className="w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <div className="w-14 h-auto relative flex items-center justify-center">
              <div className="absolute bg-red-500 text-white text-xs font-bold px-1 rounded-lg top-0 right-0">
                2
              </div>
              <div
                className={`${
                  pathName === 'groups' ? 'text-primary' : 'text-black'
                }`}
              >
                <i className="text-2xl fas fa-users"></i>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/gaming">
          <div className="w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <div className="w-14 h-auto relative flex items-center justify-center">
              <div className="absolute bg-red-500 text-white text-xs font-bold px-1 rounded-lg top-0 right-0">
                9+
              </div>
              <div
                className={`${
                  pathName === 'gaming' ? 'text-white' : 'text-black'
                }`}
              >
                <i className="text-2xl fas fa-gamepad"></i>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-span-2 flex items-center justify-end">
        <div className="h-10 w-auto flex items-center space-x-2 pr-2">
          <Link href="/profile">
            <button className="h-10 px-2 flex space-x-1 items-center justify-center focus:outline-none hover:bg-gray-300 rounded-full">
              <div className="h-8">
                <img
                  src="https://random.imagecdn.app/200/200"
                  className="w-8 h-8 rounded-full"
                  alt="dp"
                />
              </div>
              <div className="h-8 flex items-center justify-content">
                <p className="font-semibold text-sm">{appState.data.user?.firstName}</p>
              </div>
            </button>
          </Link>
          <button className="w-10 h-10 bg-gray-200 focus:outline-none hover:bg-gray-300 rounded-full">
            <i className="fas fa-plus"></i>
          </button>
          <button className="w-10 h-10 bg-gray-200 focus:outline-none hover:bg-gray-300 rounded-full">
            <i className="fab fa-facebook-messenger"></i>
          </button>
          <button className="w-10 h-10 bg-gray-200 focus:outline-none hover:bg-gray-300 rounded-full">
            <i className="fas fa-bell"></i>
          </button>
          <button className="w-10 h-10 bg-gray-200 focus:outline-none hover:bg-gray-300 rounded-full">
            <i className="fas fa-sort-down"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
