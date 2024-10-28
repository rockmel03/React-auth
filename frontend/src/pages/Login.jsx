import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

import api from "../api/axios";
import useAuth from "../hooks/useAuth";
const LOGIN_URL = "/users/login";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { setAuth } = useAuth();

  const userRef = useRef(null);
  const errRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [username, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError("invalid entry");
      return;
    }

    try {
      const response = await api.post(
        LOGIN_URL,
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const user = response?.data?.user;
      setAuth({ user, accessToken });

      setUsername("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setError("No server response");
      } else {
        setError(err?.response?.data?.error);
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="bg-blue-500 text-white p-5 rounded-lg md:min-w-[320px]">
      <p
        ref={errRef}
        aria-live="assertive"
        className={`px-2 py-1 rounded w-full bg-red-200 text-red-800 ${
          !error && "hidden"
        } transition-all duration-300 ease`}
      >
        {error}
      </p>
      <h1 className="text-2xl font-semibold my-2">Login</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-1">
        <label htmlFor="username">Username </label>
        <input
          ref={userRef}
          type="text"
          id="username"
          autoComplete="off"
          className="px-2 py-1 rounded bg-white text-black w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          id="password"
          className="px-2 py-1 rounded bg-white text-black w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="px-2 py-2 mt-2 rounded bg-blue-700 hover:bg-blue-800 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          type="submit"
          disabled={!username || !password}
        >
          Login
        </button>
        <br />
        <p className="text-sm">
          Don&apos;t have an account?{" "}
          {/* TODO: user react router Link component */}
          <Link to="/register" className="hover:underline">
            Sign up here.
          </Link>
        </p>
      </form>
    </section>
  );
};
