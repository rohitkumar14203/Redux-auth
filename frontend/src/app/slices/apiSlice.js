import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// By default reducerPath value is api.
//  we can also rename it if we want.
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redux-auth-b80r.onrender.com",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});

//* example with reducer path
// export const apiSlice = createApi({
//     reducerPath:"uerApi"
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
//     tagTypes: ['User'],
//     endpoints: (builder) => ({}),
//   });

//* in store reducer it like
// [apiSlice.reducerPath] : apiSlice.reducer
// in that case reducerPath = userApi

/**
 What’s happening in this line:
 [apiSlice.reducerPath]: apiSlice.reducer
 Yeh basically ek dynamic property name hai in your Redux reducer config object.

Breaking it down:

 apiSlice.reducerPath ------ This is a string value — by default, it’s 'api'.
 apiSlice.reducer ------ This is the actual reducer function that RTK Query uses internally to manage caching, queries, mutations etc.


So you’re basically writing:

{
  "api": apiSlice.reducer
}

But in a dynamic, flexible way — so if someone ever customizes the reducerPath while creating apiSlice, it will still work fine.

 */
