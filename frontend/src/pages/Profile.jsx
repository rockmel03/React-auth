import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Loading } from "../components";
import { jwtDecode } from "jwt-decode";

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
      setError(null);
    } catch (error) {
      const message = error?.response?.data?.error || "No server response";
      setError(message);
      setUser(null); // Clear user data if fetch fails
      throw error;
    }
  };

  useEffect(() => {
    // Reset user and error before refetching
    setUser(null);
    setError(null);

    const fetchUserData = async () => {
      try {
        if (id) {
          await fetchUser(id);
        } else if (auth?.accessToken) {
          const decodedPayload = jwtDecode(auth.accessToken);
          if (decodedPayload?._id) {
            await fetchUser(decodedPayload._id);
          } else {
            setError("Invalid user identity");
          }
        }
      } catch (error) {
        setError("Failed to fetch user data");
        console.error("Error fetching user:", error);
      }
    };

    fetchUserData();
  }, [id, auth]);

  return (
    <section className="bg-blue-500 text-white p-5 rounded-lg md:min-w-[320px]">
      {error ? (
        <div> {error}</div>
      ) : user ? (
        <div>
          <p>username: {user.username}</p>
          <p>email: {`${user?.email}`}</p>
          <p>verified: {user?.isVerified ? "Yes" : "No"}</p>
          <p>role: {user?.role}</p>
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
};
