import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "./../types/product";
import { baseQueryWithErrorHandling } from "./baseAPI";

// Define a service using a base URL and expected endpoints
export const catalogAPI = createApi({
  reducerPath: "catalogAPI",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => "products",
    }),
    getProductDetails: build.query<Product, string>({
      query: (id) => `products/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductDetailsQuery, useGetProductsQuery } = catalogAPI;
