import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";

export const Users = () => {
  const { auth } = useAuth();

  const [users, setUsers] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await api.get("/users", {
          signal: controller.signal,
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        console.log(response);
        isMounted && setUsers(response.data?.users);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h1 className="text-xl font-medium">Users List</h1>
      <hr />
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>
              <Link to={`/profile/${user._id}`} className="hover:underline">
                {user.username}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users to display.</p>
      )}
    </article>
  );
};
