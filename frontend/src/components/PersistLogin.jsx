import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router-dom";
import { Loading } from "./Loading";
import useLocalStorage from "../hooks/useLocalStorage";

export const PersistLogin = () => {
  const { auth } = useAuth();
  const [persist] = useLocalStorage("persist", false);
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error.message);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken && localStorage.getItem("isLoggedIn")
      ? verifyRefreshToken()
      : setIsLoading(false);

    //cleanup
    return () => (isMounted = false);
  }, [auth.accessToken, refresh]);

  return !persist ? <Outlet /> : isLoading ? <Loading /> : <Outlet />;
};
