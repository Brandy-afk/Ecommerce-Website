import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Product from "./types/product/product";
import { pause } from "./apiHelper";
import { RootState } from "../store";

const orderApi = createApi({
  reducerPath: "orders",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7013/api/order",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {};
  },
});

export const {} = orderApi;
export { orderApi };
