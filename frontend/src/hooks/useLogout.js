import api from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      const response = await api.get("/users/logout", {
        withCredentials: true,
      });
      setAuth({});
      return response;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return logout;
};

export default useLogout;
