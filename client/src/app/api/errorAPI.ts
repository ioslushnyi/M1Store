import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "./baseAPI";

// Define a service using a base URL and expected endpoints
export const errorAPI = createApi({
  reducerPath: "errorAPI",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (build) => ({
    getNotFoundError: build.query<object, void>({
      query: () => "error/notfound",
    }),
    getBadRequestError: build.query<object, void>({
      query: () => "error/badrequest",
    }),
    getUnauthorizedError: build.query<object, void>({
      query: () => "error/unauthorized",
    }),
    getValidationError: build.query<object, void>({
      query: () => "error/validationerror",
    }),
    getServerError: build.query<object, void>({
      query: () => "error/servererror",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLazyGetNotFoundErrorQuery,
  useLazyGetBadRequestErrorQuery,
  useLazyGetUnauthorizedErrorQuery,
  useLazyGetValidationErrorQuery,
  useLazyGetServerErrorQuery,
} = errorAPI;
