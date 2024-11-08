import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

export const Home = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("isLoggedIn");
      const response = await logout();
      console.log("logout successful", response);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <section className="bg-blue-500 text-white p-5 rounded-lg md:min-w-[320px]">
      <h1 className="text-xl font-medium">You are logged in!😀</h1>
      <br />
      <Link to={`/profile/`} className="hover:underline">
        😎 See your Profile
      </Link>
      <br />
      <Link to="/editor" className="hover:underline">
        ✍️ Go to Editor Page
      </Link>
      <br />
      <Link to="/admin" className="hover:underline">
        🥷 Go to Admin Page
      </Link>

      <br />
      <br />
      <button
        onClick={handleLogout}
        className="px-2 py-1 rounded bg-white text-blue-500 active:scale-90 ease duration-100"
      >
        Log Out
      </button>
    </section>
  );
};
