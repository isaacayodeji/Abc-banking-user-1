import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.xpresspayments.com:2300/",
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => {
        return {
          url: "Admin",
          method: "POST",
          body: data.request,
        };
      },
    }),
    userLogin: builder.mutation({
      query: (data) => {
        return {
          url: "Login",
          method: "POST",
          body: data.request,
        };
      },
    }),
    register: builder.mutation({
      query: (data) => {
        return {
          url: "signUp",
          method: "POST",
          body: data.request,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: data.response,
          method: "POST",
          body: data.request,
        };
      },
    }),
  }),
});
export const {
  useAdminLoginMutation,
  useUserLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
} = authApi;
