import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tokenRequestResponse from "./types/tokenRequestResponse";
import credentials from "./types/credentials";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7013/api/Auth",
    // fetchFn: async (...args) => {
    //   await pause(1000);
    //   return fetch(...args);
    // },
  }),
  endpoints(builder) {
    return {
      getToken: builder.mutation<tokenRequestResponse, credentials>({
        query: (credentials: credentials) => {
          return {
            url: "/Login",
            method: "POST",
            body: credentials,
          };
        },
      }),
    };
  },
});

export const { useGetTokenMutation } = authApi;
export { authApi };
