import { apiSlice } from "../apiSlice";
import { signInPayload, signUpPayload } from "../types";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    register: builder.mutation({
      query: (data: signUpPayload) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data: signInPayload) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
  // overrideExisting: true,
});

export const { useRegisterMutation, useLoginMutation } = authApi;
