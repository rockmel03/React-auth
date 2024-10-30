import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApiPrivate from "../hooks/useApiPrivate";

export const Users = () => {
  const apiPrivate = useApiPrivate();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await apiPrivate.get("/users", {
          signal: controller.signal,
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
