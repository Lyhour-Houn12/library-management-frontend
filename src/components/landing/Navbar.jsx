import { Link } from "react-router";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useState } from "react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Browse Books", path: "/books" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="group flex items-center space-x-2">
            <div className="rounded-full bg-indigo-600 p-2 transition-colors duration-200 group-hover:bg-indigo-700">
              <MenuBookIcon sx={{ fontSize: "2.2rem", color: "white" }} />
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
              Jing Library
            </span>
          </Link>

          {/* NAVIGATION LINKS */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-600"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* BUTTON */}
          <div className="hidden items-center space-x-4 md:flex">
            <Link
              to="/login"
              className="font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-600"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="tranition-all rounded-lg bg-indigo-600 px-6 py-2 text-white shadow-md duration-200 hover:bg-indigo-700 hover:shadow-lg"
            >
              Sign Up
            </Link>
          </div>
          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none md:hidden"
          >
            {isMenuOpen ? (
              <CloseIcon sx={{ fontSize: "2rem" }} />
            ) : (
              <MenuIcon sx={{ fontSize: "2rem" }} />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col space-y-4 border-t border-gray-200 p-4">
              <Link
                to="/login"
                className="block px-4 py-2 font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block rounded-lg bg-indigo-600 px-4 py-2 text-center font-medium text-white shadow-md transition-colors duration-200 hover:bg-indigo-700 hover:shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
