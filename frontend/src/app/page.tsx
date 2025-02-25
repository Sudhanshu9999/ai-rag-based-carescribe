"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AuthModal from "@/components/AuthModal";

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const features = [
  {
    title: "Smart Summaries",
    description:
      "Generate concise, accurate summaries of your medical notes automatically.",
  },
  {
    title: "Secure & Private",
    description:
      "Your notes are securely stored and accessible only to you.",
  },
  {
    title: "User-Friendly",
    description:
      "An intuitive interface designed to save time and improve workflow.",
  },
];

export default function MainPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "register">("login");

  const openLoginModal = () => {
    setModalMode("login");
    setShowModal(true);
  };

  const openRegisterModal = () => {
    setModalMode("register");
    setShowModal(true);
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 flex flex-col">
      {/* Hero Section */}
      <motion.header
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="flex-grow flex flex-col items-center justify-center px-4 py-8 sm:px-8 sm:py-16 text-center"
      >
        <h1 className="text-3xl sm:text-6xl font-extrabold text-gray-800 mb-4">
          Welcome to CareScribe
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mb-8">
          An AI-powered platform that streamlines your medical note-taking by
          generating smart, concise summaries—so you can focus on patient care.
        </p>
        {/* Button Container: Mobile uses max-w-sm, Desktop uses max-w-xs */}
        <div className="flex flex-col sm:flex-row gap-4 w-full mx-auto max-w-sm sm:max-w-xs">
        <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={openLoginModal}
            className="w-full py-3 text-white rounded-xl shadow-lg transition-all duration-200 ease-in-out bg-gradient-to-r from-blue-500 to-blue-700 uppercase tracking-wide"
          >
            Login
          </motion.button>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={openRegisterModal}
            className="w-full py-3 text-white rounded-xl shadow-lg transition-all duration-200 ease-in-out bg-gradient-to-r from-green-500 to-green-700 uppercase tracking-wide"
          >
            Register
          </motion.button>
        </div>
      </motion.header>

      {/* Features Section */}
      <motion.section
        variants={heroVariants}
        initial="hidden"
        animate="visible"
        className="py-16 bg-white"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Why Choose CareScribe?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 border rounded-lg shadow hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500">
        © {new Date().getFullYear()} CareScribe. All rights reserved.
      </footer>

      {/* Modal */}
      {showModal && <AuthModal initialMode={modalMode} onClose={() => setShowModal(false)} />}
    </div>
  );
}
