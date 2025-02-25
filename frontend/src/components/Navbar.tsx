import React, { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ProtectedNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <nav className="relative z-50 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-bold cursor-pointer text-black">
          CareScribe
          </span>
        </Link>
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link href="/notes">
            <span className="cursor-pointer text-black hover:underline">
              Notes
            </span>
          </Link>
          <Link href="/upload">
            <span className="cursor-pointer text-black hover:underline">
              Upload
            </span>
          </Link>
          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="cursor-pointer text-black hover:underline"
          >
            Logout
          </button>
        </div>
        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 text-black" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Sliding Drawer */}
      <motion.div
        className="fixed top-0 right-0 h-full w-64 bg-white shadow"
        initial={{ x: "100%" }}
        animate={{ x: menuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4">
          <button
            onClick={toggleMenu}
            className="mb-4 focus:outline-none"
            aria-label="Close menu"
          >
            <XMarkIcon className="h-6 w-6 text-black" />
          </button>
          <nav className="flex flex-col space-y-4">
            <Link href="/notes">
              <span
                onClick={toggleMenu}
                className="cursor-pointer text-black hover:underline"
              >
                Notes
              </span>
            </Link>
            <Link href="/upload">
              <span
                onClick={toggleMenu}
                className="cursor-pointer text-black hover:underline"
              >
                Upload
              </span>
            </Link>
            <button
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
              className="text-left cursor-pointer text-black hover:underline"
              aria-label="Logout"
            >
              Logout
            </button>
          </nav>
        </div>
      </motion.div>
    </nav>
  );
};

export default ProtectedNavBar;
