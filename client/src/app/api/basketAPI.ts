import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./baseAPI";
import type { Basket } from "../types/basket";

// Define a service using a base URL and expected endpoints
export const basketAPI = createApi({
  reducerPath: "basketAPI",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (build) => ({
    getBasket: build.query<Basket, void>({
      query: () => "basket",
    }),
    addItemToBasket: build.mutation<
      Basket,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `basket/item?productId=${productId}&quantity=${quantity}`,
        method: "POST",
      }),
    }),
    removeItemFromBasket: build.mutation<
      Basket,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `basket/item?productId=${productId}&quantity=${quantity}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBasketQuery,
  useAddItemToBasketMutation,
  useRemoveItemFromBasketMutation,
} = basketAPI;
