import { Link } from "react-router-dom";

export const Home = () => {
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
    </section>
  );
};
