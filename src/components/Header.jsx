import React, { useContext } from "react";
import hellow from "../../src/assets/hellow.png";
import banner from "../../src/assets/banner.png";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row items-center mt-20 px-4 text-gray-800 md:text-left text-center"
    >
      {/* Left Side */}
      <div className="flex-1">
        <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2 capitalize justify-center md:justify-start">
          <img className="w-18 aspect-square" src={hellow} alt="" />
          {userData ? userData.name : "Developer"}!
        </h1>

        <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
          Welcome To MERN App
        </h2>
        <p className="mb-8 max-w-md">
          Auth MERN – Authentication & Security App is a MERN stack project that
          focuses on user authentication and data security. It uses JWT (JSON
          Web Token) for handling user sessions so that once a user logs in,
          they don’t need to enter their password for every request. User
          passwords are protected with bcrypt hashing, meaning they are never
          stored in plain text, which keeps them safe even if the database is
          exposed. The app also includes email verification where an OTP
          (One-Time Password) is sent to the user’s email, and the account is
          verified only after the correct OTP is entered before it expires. For
          cases where users forget their passwords, the system provides a reset
          password feature that works with another OTP and expiry time to ensure
          secure password recovery. To strengthen security further, the database
          keeps track of whether the account is verified and makes sure OTPs
          cannot be reused after expiration. Overall, this project provides a
          complete and secure authentication system for web applications.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex-1 mt-10 md:mt-0 flex justify-center">
        <img
          src={banner}
          alt="banner"
          className="w-full max-w-md object-cover rounded-xl "
        />
      </div>
    </motion.div>
  );
};

export default Header;
