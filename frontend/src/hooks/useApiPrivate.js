import { apiPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

export default function useApiPrivate() {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = apiPrivate.interceptors.request.use(
      (request) => {
        if (auth?.accessToken) {
          request.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }
        return request;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = apiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true;

          const accessToken = await refresh();
          if (accessToken) {
            prevRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return apiPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiPrivate.interceptors.request.eject(requestInterceptor);
      apiPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth.accessToken, refresh]);

  return apiPrivate;
}
