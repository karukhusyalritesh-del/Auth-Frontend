import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function AuthCard() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Login"); // Login or Sign Up
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-200 to-green-500 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        {/* Heading */}
        <div className="text-center mb-6">
          {state === "Sign Up" && (
            <p className="text-sm text-gray-500">Create an account</p>
          )}
          <h1 className="text-xl font-bold tracking-widest">
            {state === "Sign Up" ? "SIGN UP" : "LOGIN"}
          </h1>
        </div>

        <form onSubmit={onSubmitHandler}>
          {/* Name input only for Sign Up */}
          {state === "Sign Up" && (
            <div className="mb-4">
              <label className="text-sm block">Name</label>
              <input
                type="text"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-green-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
              />
            </div>
          )}

          {/* Email input */}
          <div className="mb-4">
            <label className="text-sm block">Email</label>
            <input
              type="email"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-green-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-2">
            <label className="text-sm block">Password</label>
            <input
              type="password"
              className="w-full border-b border-gray-300 focus:outline-none focus:border-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="**********"
              required
            />
          </div>

          {/* Forgot password link only for Login */}
          {state === "Login" && (
            <div className="text-right mb-4">
              <p
                onClick={() => navigate("/reset-password")}
                className="text-sm text-green-500 hover:underline cursor-pointer"
              >
                Forgot password?
              </p>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            {state === "Sign Up" ? "SIGN UP" : "LOGIN"}
          </button>
        </form>

        {/* Toggle login/signup */}
        <p className="text-center text-sm mt-4 text-gray-600">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                className="text-green-500 hover:underline cursor-pointer"
                onClick={() => setState("Login")}
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                className="text-green-500 hover:underline cursor-pointer"
                onClick={() => setState("Sign Up")}
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
