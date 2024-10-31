import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import { Loading } from "./Loading";

export const PersistLogin = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error.message);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [auth.accessToken, refresh]);

  return isLoading ? <Loading /> : <Outlet />;
};

