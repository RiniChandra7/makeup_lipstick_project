import React from 'react';
import { Link, NavLink, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import DupeFinder from './dupe-finder.component';
import Recommendations from './recommendations.component';
import SuggestDupes from './suggest-dupes.component';
import Home from './home.component';

const Navbar = () => {
  return (
    <>
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold">
              My Website
            </Link>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <Link
                to="/dupe-finder"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="text-white"
              >
                Dupe Finder
              </Link>
              <Link
                to="/recommendations"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="text-white"
              >
                Recommendations by Skin Tone
              </Link>
              <Link
                to="/suggest-dupes"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="text-white"
              >
                Suggest Dupes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <Outlet />
    </>
  );
};

export default Navbar;
