import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./baseAPI";
import { type Basket, type Item } from "../types/basket";
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
        let isNewBasket = false;
        // Increase item total and item quantity to update the basket item view right away
        const optimisticPatch = dispatch(
          basketAPI.util.updateQueryData("getBasket", undefined, (draft) => {
            if (!draft?.basketId) isNewBasket = true;

            if (!isNewBasket) {
              const existingItem = draft?.items.find(
                (item) => item.productId === product.id
              );
              if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.price =
                  existingItem.basePrice * existingItem.quantity;
              } else {
                const item: Item = {
                  productId: product.id,
                  product: product,
                  quantity: quantity,
                  basePrice: product.price,
                  price: product.price * quantity,
                };
                draft.items.push(item);
              }
            }
          })
        );
        try {
          const { data: updatedBasket } = await queryFulfilled;
          if (isNewBasket) dispatch(basketAPI.util.invalidateTags(["Basket"]));
          else {
            // Wait for basket update result from the server and save recalculated basket to the state
            dispatch(
              basketAPI.util.updateQueryData(
                "getBasket",
                undefined,
                (draft) => {
                  Object.assign(draft, updatedBasket);
                }
              )
            );
          }
        } catch (err) {
          // Revert optimistic item totals & quantity update in case of failure
          optimisticPatch.undo();
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
        // Increase item total and item quantity to update the basket item view right away

        const optimisticPatch = dispatch(
          basketAPI.util.updateQueryData("getBasket", undefined, (draft) => {
            const itemIndex = draft?.items.findIndex(
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
          const { data: updatedBasket } = await queryFulfilled;
          // Wait for basket update result from the server and save recalculated basket to the state
          dispatch(
            basketAPI.util.updateQueryData("getBasket", undefined, (draft) => {
              Object.assign(draft, updatedBasket);
            })
          );
        } catch (err) {
          // Revert optimistic item totals & quantity update in case of failure
          optimisticPatch.undo();
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
