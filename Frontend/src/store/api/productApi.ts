import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Product from "./types/product/product";
import FetchProductsParams from "./types/product/fetchProductsParams";
import CreateProductParams from "./types/product/createProductParams";
import { RootState } from "../store";
import { pause } from "./apiHelper";
import UpdateProductParams from "./types/product/updateProductParams";
import Disc, { DiscWithId } from "./types/product/disc";
import InventoryWithID, { Inventory } from "./types/inventory/inventory";
import ImageResponse from "./types/image/imageUploadReponse";
import {
  ImageUpdateRequest,
  ImageUploadRequest,
} from "./types/image/imageUploadRequest";
import Clothing, { ClothingWithId } from "./types/product/clothing";
import ClothingInventoryUpdateRequest, {
  ClothingInventory,
} from "./types/inventory/clothingInventory";
import ProductQueryReponse from "./types/product/productQueryResponse";
import { CartItemType } from "../slices/cartSlice";
import CreateCheckoutResponse, {
  CreateCheckoutRequest,
} from "./types/payment/checkout";
import { ContactFormValues } from "../../pages/ContactPage";
import StringResponse from "./types/responses/stringResponse";

const productApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7013/api",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Products", "Product"],
  endpoints(builder) {
    return {
      fetchProducts: builder.query<ProductQueryReponse, FetchProductsParams>({
        providesTags: (result, _error, params) => [
          "Products",
          ...(result
            ? result.products.map((product) => ({
                type: "Product" as const,
                id: product.productId,
              }))
            : []),
        ],
        query: (params) => {
          const queryParams = new URLSearchParams();

          if (params.activeOnly !== undefined)
            queryParams.append("activeOnly", params.activeOnly.toString());

          if (params.productTypes && params.productTypes.length > 0)
            params.productTypes.forEach((type) =>
              queryParams.append("productTypes", type)
            );

          if (params.pageNumber !== undefined)
            queryParams.append("pageNumber", params.pageNumber.toString());

          if (params.limit !== undefined)
            queryParams.append("limit", params.limit.toString());

          if (params.colorQuery && params.colorQuery.length > 0)
            params.colorQuery.forEach((color) =>
              queryParams.append("colorQuery", color)
            );

          if (params.idQuery && params.idQuery.length > 0)
            params.idQuery.forEach((id) => queryParams.append("idQuery", id));

          if (params.manufacturers && params.manufacturers.length > 0)
            params.manufacturers.forEach((manufacturer) =>
              queryParams.append("manufacturers", manufacturer.toString())
            );

          if (params.discTypes && params.discTypes.length > 0)
            params.discTypes.forEach((discType) =>
              queryParams.append("discTypes", discType.toString())
            );

          if (params.nameQuery)
            queryParams.append("nameQuery", params.nameQuery);

          if (params.minPrice !== undefined && params.maxPrice !== undefined) {
            if (
              params.minPrice >= 0 &&
              params.maxPrice > 0 &&
              params.maxPrice > params.minPrice
            ) {
              queryParams.append("minPrice", params.minPrice.toString());
              queryParams.append("maxPrice", params.maxPrice.toString());
            } else if (params.minPrice >= 0 && params.maxPrice === 0) {
              queryParams.append("minPrice", params.minPrice.toString());
            }
          } else if (params.minPrice !== undefined && params.minPrice >= 0) {
            queryParams.append("minPrice", params.minPrice.toString());
          }

          if (params.inStockOnly !== undefined && params.inStockOnly === true)
            queryParams.append("inStockOnly", params.inStockOnly.toString());

          if (
            params.sortQuery !== undefined &&
            params.isDescending !== undefined
          ) {
            queryParams.append("sortQuery", params.sortQuery);
            queryParams.append("isDescending", params.isDescending.toString());
          }

          return {
            url: `/Product?${queryParams.toString()}`,
            method: "GET",
          };
        },
      }),
      fetchRecentDiscs: builder.query<Product[], void>({
        providesTags: ["Products"],
        query: () => ({
          url: "/Product/recent",
          method: "GET",
        }),
      }),
      fetchProduct: builder.query<Product, string>({
        providesTags: (_result, _error, id) => [{ type: "Product", id }],
        query: (Id) => ({
          url: `/Product/${Id}`,
          method: "GET",
        }),
      }),
      uploadProduct: builder.mutation<Product, CreateProductParams>({
        invalidatesTags: ["Products"],
        query: (request) => {
          return {
            url: "/Product/",
            method: "POST",
            body: request,
          };
        },
      }),
      deleteProduct: builder.mutation<Product, string>({
        invalidatesTags: (_result, _error, id) => [
          { type: "Product", id },
          "Products",
        ],
        query: (Id) => ({
          url: `/Product/${Id}`,
          method: "DELETE",
        }),
      }),
      updateProduct: builder.mutation<Product, UpdateProductParams>({
        invalidatesTags: (_result, _error, request) => [
          { type: "Product", id: request.productId },
          "Products",
        ],
        query: (request) => {
          return {
            url: `/Product/${request.productId}`,
            method: "PUT",
            body: request,
          };
        },
      }),
      updateDisc: builder.mutation<Disc, DiscWithId>({
        invalidatesTags: (_result, _error, request) => [
          { type: "Product", id: request.productId },
        ],
        query: (request) => {
          const discObject: Disc = request as Disc;
          return {
            url: `/Disc/${request.productId}`,
            method: "PUT",
            body: discObject,
          };
        },
      }),
      updateClothing: builder.mutation<Clothing, ClothingWithId>({
        invalidatesTags: (_result, _error, request) => [
          { type: "Product", id: request.productId },
        ],
        query: (request) => {
          return {
            url: `/Clothing/${request.productId}`,
            method: "PUT",
            body: request as Clothing,
          };
        },
      }),
      updateInventory: builder.mutation<Inventory, InventoryWithID>({
        invalidatesTags: (_result, _error, request) => [
          { type: "Product", id: request.productId },
        ],
        query: (request) => {
          return {
            url: `/Inventory/${request.productId}`,
            method: "PUT",
            body: request as Inventory,
          };
        },
      }),
      updateClothingInventory: builder.mutation<
        ClothingInventory[],
        ClothingInventoryUpdateRequest
      >({
        invalidatesTags: (_result, _error, request) => [
          { type: "Product", id: request.productId },
        ],
        query: (request) => {
          return {
            url: `/Inventory/clothing/${request.productId}`,
            method: "PUT",
            body: {
              inventories: request.inventories,
            },
          };
        },
      }),
      uploadImage: builder.mutation<ImageResponse, ImageUploadRequest>({
        query: (request) => {
          const formData = new FormData();
          formData.append("File", request.file);
          formData.append("FileName", request.fileName);
          formData.append("FileDescription", request.fileDescription);

          return {
            url: "/Image/upload",
            method: "POST",
            body: formData,

            formData: true,
          };
        },
      }),
      updateImage: builder.mutation<ImageResponse, ImageUpdateRequest>({
        invalidatesTags: (_result, _error, request) => [
          { type: "Product", id: request.productId },
        ],
        query: (request) => {
          const formData = new FormData();
          if (request.file) {
            formData.append("File", request.file);
          }
          formData.append("FileName", request.fileName);
          formData.append("FileDescription", request.fileDescription);

          return {
            url: `/Image/${request.imageId}`,
            method: "PUT",
            body: formData,
            formData: true,
          };
        },
      }),
      createCheckoutSession: builder.mutation<
        CreateCheckoutResponse,
        CreateCheckoutRequest
      >({
        query: (request) => {
          return {
            url: "/Payment/create-checkout-session",
            method: "POST",
            body: request,
          };
        },
      }),
      submitContactForm: builder.mutation<StringResponse, ContactFormValues>({
        query: (request) => {
          return {
            url: "/Contact",
            method: "POST",
            body: request,
          };
        },
      }),
      subToNewsletter: builder.mutation<StringResponse, string>({
        query: (request) => {
          return {
            url: "/Newsletter",
            method: "POST",
            body: {
              email: request,
            },
          };
        },
      }),
    };
  },
});

export const {
  useDeleteProductMutation,
  useFetchProductQuery,
  useFetchProductsQuery,
  useFetchRecentDiscsQuery,
  useUploadProductMutation,
  useUpdateProductMutation,
  useUpdateDiscMutation,
  useUpdateClothingMutation,
  useUpdateInventoryMutation,
  useUpdateClothingInventoryMutation,
  useUploadImageMutation,
  useUpdateImageMutation,
  useCreateCheckoutSessionMutation,
  useSubmitContactFormMutation,
  useSubToNewsletterMutation,
} = productApi;

export { productApi };
