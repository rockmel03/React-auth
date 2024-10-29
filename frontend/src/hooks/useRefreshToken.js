import useAuth from "./useAuth";
import api from "../api/axios";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    try {
      const response = await api.post(
        "/users/refresh-token",
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAuth((prev) => ({ ...prev, accessToken: response.data?.accessToken }));
      return response.data?.accessToken;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return refresh;
};
