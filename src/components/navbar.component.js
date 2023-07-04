import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav style={{ backgroundColor: '#b07082' }}>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white text-xl font-bold">
                Lipcolor Engine
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/dupe-finder"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  activeClassName="text-gray-300"
                >
                  Dupe Finder
                </Link>
                <Link
                  to="/recommendations"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  activeClassName="text-gray-300"
                >
                  Recommendations by Skin Tone
                </Link>
                <Link
                  to="/suggest-dupes"
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                  activeClassName="text-gray-300"
                >
                  Suggest Dupes
                </Link>
              </div>
            </div>
            <div className="sm:hidden">
              <button
                type="button"
                className="text-white hover:text-gray-300 focus:outline-none focus:text-white"
                onClick={toggleMenu}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1" style={{ backgroundColor: '#b07082', border: '1px solid white' }}>
            <div>
              <Link
                to="/dupe-finder"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="text-gray-300"
              >
                Dupe Finder
              </Link>
            </div>
            <div>
              <Link
                to="/recommendations"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="text-gray-300"
              >
                Recommendations by Skin Tone
              </Link>
            </div>
            <div>
              <Link
                to="/suggest-dupes"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                activeClassName="text-gray-300"
              >
                Suggest Dupes
              </Link>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Navbar;
