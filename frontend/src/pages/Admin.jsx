import { Link } from "react-router-dom";
import { Users } from "../components";

export const Admin = () => {
  return (
    <section className="bg-blue-500 text-white p-5 rounded-lg  md:min-w-[320px]">
      <h1 className="text-2xl font-semibold">Admin Page</h1>
      <br />
      <Users />
      <br />
      <Link to="/">
        <button className=" bg-white px-2 py-1 rounded text-blue-500">
          Back to Home
        </button>
      </Link>
    </section>
  );
};
