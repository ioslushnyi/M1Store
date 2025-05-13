// import 3d party libraries
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
// import styles
import "./app/styles.css";
// import fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// import router
import { router } from "./app/routes/Router";
// import store
import { store } from "./app/store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-center" theme="colored" />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
