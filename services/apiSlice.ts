import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  // baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_ROOT_API }),
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1212" }),
  tagTypes: ["tasks"],
  endpoints: (build) => ({}),
});
