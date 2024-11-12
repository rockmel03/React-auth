import { useGetUsersQuery } from "./usersApiSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const {
    data: { users = {} } = {}, // Destructure `users` from `data`. If `data` or `users` is undefined, set `users` to an empty array.
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <section className="userslist">
        <h1> Users List</h1>
        <ul>
          {users && users?.length > 0 ? (
            users.map((user) => <li key={user._id}>{user.username}</li>)
          ) : (
            <li>No Users to Display</li>
          )}
        </ul>
        <br />
        <Link to="/welcome">Back to Welcome</Link>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default UsersList;
