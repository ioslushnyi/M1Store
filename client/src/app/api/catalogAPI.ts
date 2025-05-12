import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "./../types/product";

// Define a service using a base URL and expected endpoints
export const catalogAPI = createApi({
  reducerPath: "catalogAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5150/api/" }),
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
