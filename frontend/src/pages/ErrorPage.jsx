import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <section className="bg-blue-500 text-white p-5 rounded-lg md:min-w-[320px]">
      <h1 className="text-2xl font-semibold">Error 404 - Page Not Found</h1>
      <p>The page you are trying to access does not exist.</p>
      <Link to="/" className="hover:underline">
        Back to Home
      </Link>
    </section>
  );
};
