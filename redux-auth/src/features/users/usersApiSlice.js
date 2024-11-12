import { apiSlice } from "../../app/api/apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      keepUnusedDataFor: 5, //indicates that once the data has been fetched, it will be kept in the cache for 5 seconds before it is removed. This can help reduce redundant network requests.
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
