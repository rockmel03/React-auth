import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Loading } from "../components";

export const Profile = () => {
  const { id } = useParams();
  const { auth } = useAuth();

  const [user, setUser] = useState();
  const [error, setError] = useState();

  const fetchUser = async (id) => {
    try {
      const response = await api.get(`/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth?.accessToken,
        },
      });
      setUser(response.data?.user);
    } catch (error) {
      if (!error.status) {
        setError("No server response");
      } else {
        setError(error?.response?.data?.error);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser(id);
    } else if (auth?.user?._id) {
      fetchUser(auth?.user?._id);
    }
  }, [id, auth]);

  return (
    <section className="bg-blue-500 text-white p-5 rounded-lg md:min-w-[320px]">
      {error ? (
        <div> {error}</div>
      ) : user ? (
        <div>
          <p>username: {user.username}</p>
          <p>email: {`${user?.email}`}</p>
          <p>verified: {`${user?.isVerified}`}</p>
          <p>role: {user?.role}</p>
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
};
