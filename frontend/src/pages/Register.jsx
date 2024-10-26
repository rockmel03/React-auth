import { useEffect, useRef, useState } from "react";
import api from "../api/axios";

const REGISTER_URL = "users/register";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const Register = () => {
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

      console.log(response);

      setError("");
      // reset fields
      setUsername("");
      setPassword("");
      setCnfPassword("");
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
    <section className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="bg-blue-500 text-white p-5 rounded-lg  md:min-w-[320px]">
        <h1 className="text-2xl font-semibold">Register</h1>
        <br />
        <p
          ref={errRef}
          className={`px-2 py-1 rounded w-full bg-red-200 text-red-800 ${
            !error && "hidden"
          } transition-all duration-300 ease`}
        >
          {error}
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <input
            className={`px-2 py-1 rounded bg-white text-black w-full ${
              focusUser && username && !validUsername ? "outline-red-500" : ""
            }`}
            type="text"
            id="username"
            autoComplete="false"
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
          <label htmlFor="password">Password</label>
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
          <label htmlFor="cnf-password">Confirm Password</label>
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
      </div>
    </section>
  );
};
