/*
// steps
// => create baseQuery setup auth header with accessToken also include credentials
// => incase token expires wrap it with baseQueryWithReAuth
//      where request new access token and set it into state
//      and retry original query
// => create apiSlice and export it
*/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // console.log("sending refresh token");
    //send refresh token to get new access token
    const refreshResult = await baseQuery(
      { url: "/users/refresh-token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const user = api.getState().user;
      //store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      //retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}), // we'll keep this empty because we're going to create extended api slices (so we can specify the what belongs to which specific part)
});
