import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./baseAPI";
import { Item, type Basket } from "../types/basket";
import type { Product } from "../types/product";

// Define a service using a base URL and expected endpoints
export const basketAPI = createApi({
  reducerPath: "basketAPI",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Basket"],
  endpoints: (build) => ({
    getBasket: build.query<Basket, void>({
      query: () => "basket",
      providesTags: ["Basket"],
    }),
    addItemToBasket: build.mutation<
      Basket,
      { product: Product; quantity: number }
    >({
      query: ({ product, quantity }) => ({
        url: `basket/item?productId=${product.id}&quantity=${quantity}`,
        method: "POST",
      }),
      onQueryStarted: async (
        { product, quantity },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          basketAPI.util.updateQueryData("getBasket", undefined, (draft) => {
            const existingItem = draft.items.find(
              (item) => item.productId === product.id
            );
            if (existingItem) {
              existingItem.quantity += quantity;
              existingItem.price =
                existingItem.basePrice * existingItem.quantity;
            } else draft.items.push(new Item(product, quantity));
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          console.log(err);
        }
      },
    }),
    removeItemFromBasket: build.mutation<
      Basket,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `basket/item?productId=${productId}&quantity=${quantity}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) => {
        const patchResult = dispatch(
          basketAPI.util.updateQueryData("getBasket", undefined, (draft) => {
            const itemIndex = draft.items.findIndex(
              (item) => item.productId === productId
            );
            if (itemIndex >= 0) {
              draft.items[itemIndex].quantity -= quantity;
              draft.items[itemIndex].price =
                draft.items[itemIndex].basePrice *
                draft.items[itemIndex].quantity;
              if (draft.items[itemIndex].quantity <= 0) {
                draft.items.splice(itemIndex, 1);
              }
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
          console.log(err);
        }
      },
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
