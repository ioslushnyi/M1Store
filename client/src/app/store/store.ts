import { configureStore } from "@reduxjs/toolkit";
import { catalogAPI } from "./../api/catalogAPI";
import { uiSlice } from "./uiSlice";
import { errorAPI } from "../api/errorAPI";
import { basketAPI } from "../api/basketAPI";

// ...

export const store = configureStore({
  reducer: {
    [uiSlice.reducerPath]: uiSlice.reducer,
    [errorAPI.reducerPath]: errorAPI.reducer,
    [catalogAPI.reducerPath]: catalogAPI.reducer,
    [basketAPI.reducerPath]: basketAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      errorAPI.middleware,
      catalogAPI.middleware,
      basketAPI.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
