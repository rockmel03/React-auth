import { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";

const REGISTER_URL = "users/register";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const Register = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const errRef = useRef(null);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [focusUser, setFocusUser] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [focusPwd, setFocusPwd] = useState(false);

  const [cnfPassword, setCnfPassword] = useState("");
  const [focusCnfPwd, setFocusCnfpwd] = useState(false);

  const [isPwdMatch, setIsPwdMatch] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setError("Invalid Entry");
      return;
    }

    try {
      const response = await api.post(
        REGISTER_URL,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const user = response?.data?.user;
      setAuth({ user, accessToken });

      setError("");
      // reset fields
      setUsername("");
      setPassword("");
      setCnfPassword("");

      // navigate
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setError("No server response");
      } else if (error.status === 403) {
        setError("username already register");
      } else {
        setError(error.response.data.error);
      }
      errRef.current.focus(); //
    }
  };

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setIsPwdMatch(password === cnfPassword);
  }, [cnfPassword, password]);

  useEffect(() => {
    setError("");
  }, [username, password, cnfPassword]);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <section className="bg-blue-500 text-white p-5 rounded-lg  md:min-w-[320px]">
      <p
        ref={errRef}
        aria-live="assertive"
        className={`px-2 py-1 rounded w-full bg-red-200 text-red-800 ${
          !error && "hidden"
        } transition-all duration-300 ease`}
      >
        {error}
      </p>
      <h1 className="text-2xl font-semibold my-2">Register</h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-1">
        <label htmlFor="username">
          Username{" "}
          {username && validUsername && (
            <FontAwesomeIcon icon={faCheck} style={{ color: "#00ff4c" }} />
          )}
          {username && !validUsername && (
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#ff0000" }}
            />
          )}
        </label>
        <input
          className={`px-2 py-1 rounded bg-white text-black w-full ${
            focusUser && username && !validUsername ? "outline-red-500" : ""
          }`}
          type="text"
          id="username"
          autoComplete="off"
          ref={usernameRef}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onFocus={() => setFocusUser(true)}
          onBlur={() => setFocusUser(false)}
          aria-invalid={validUsername ? "false" : "true"}
          aria-describedby="usrNote"
          required
        />
        <p
          id="usrNote"
          className={`${
            focusUser && username && !validUsername ? "block" : "hidden"
          } text-xs bg-zinc-800 p-2 rounded`}
        >
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
        <label htmlFor="password">
          Password{" "}
          {password && validPwd && (
            <FontAwesomeIcon icon={faCheck} style={{ color: "#00ff4c" }} />
          )}
          {password && !validPwd && (
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#ff0000" }}
            />
          )}
        </label>
        <input
          className={`px-2 py-1 rounded bg-white text-black w-full ${
            focusPwd && password && !validPwd ? "outline-red-500" : ""
          }`}
          type="password"
          id="password"
          ref={passwordRef}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocusPwd(true)}
          onBlur={() => setFocusPwd(false)}
          aria-invalid={validPwd ? "false" : " true"}
          aria-describedby="pwdNote"
          required
        />
        <p
          id="pwdNote"
          className={`${
            focusPwd && password && !validPwd ? "block" : "hidden"
          } text-xs bg-zinc-800 p-2 rounded`}
        >
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>
        <label htmlFor="cnf-password">
          Confirm Password{" "}
          {cnfPassword && isPwdMatch && (
            <FontAwesomeIcon icon={faCheck} style={{ color: "#00ff4c" }} />
          )}
          {cnfPassword && !isPwdMatch && (
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#ff0000" }}
            />
          )}
        </label>
        <input
          className={`px-2 py-1 rounded bg-white text-black w-full ${
            focusCnfPwd && cnfPassword && !isPwdMatch ? "outline-red-500" : ""
          }`}
          type="password"
          id="cnf-password"
          value={cnfPassword}
          onChange={(e) => setCnfPassword(e.target.value)}
          onFocus={() => setFocusCnfpwd(true)}
          onBlur={() => setFocusCnfpwd(false)}
          aria-invalid={isPwdMatch ? "false" : "true"}
          aria-describedby="cnfNote"
          required
        />
        <p
          id="cnfNote"
          className={`${
            focusCnfPwd && cnfPassword && !isPwdMatch ? "block" : "hidden"
          } text-xs bg-zinc-800 p-2 rounded`}
        >
          Must match the first password input field
        </p>

        <button
          className="px-2 py-2 mt-2 rounded bg-blue-700 hover:bg-blue-800 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          type="submit"
          disabled={!validUsername || !validPwd || !isPwdMatch ? true : false}
        >
          Register
        </button>
      </form>
      <br />
      <p className="text-sm">
        Already have an account? {/* TODO: user react router Link component */}
        <Link to="/login" className="hover:underline">
          Login here.
        </Link>
      </p>
    </section>
  );
};
