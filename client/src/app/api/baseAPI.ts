import {
  type BaseQueryApi,
  type FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../store/uiSlice";
import { toast } from "react-toastify";

type ErrorResponse = {
  title: string;
};

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:5150/api",
});

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  api.dispatch(startLoading());
  console.log("start loading");
  await sleep();
  const result = await customBaseQuery(args, api, extraOptions);
  api.dispatch(stopLoading());
  console.log("stop loading");
  if (result.error) {
    const status = result.error.status;
    const data = result.error.data as ErrorResponse;
    console.log({ status, data });
    toast.error(data.title);
  }

  return result;
};
