import { configureStore } from "@reduxjs/toolkit";
import { catalogAPI } from "./../api/catalogAPI";
import { uiSlice } from "./uiSlice";

// ...

export const store = configureStore({
  reducer: {
    [catalogAPI.reducerPath]: catalogAPI.reducer,
    [uiSlice.reducerPath]: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catalogAPI.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
