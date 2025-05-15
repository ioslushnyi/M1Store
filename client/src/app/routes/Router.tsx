import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Home from "../components/home/Home";
import Catalog from "../components/catalog/Catalog";
import ProductDetails from "../components/catalog/ProductDetails";
import About from "../components/about/About";
import ServerError from "../components/errors/ServerError";
import NotFound from "../components/errors/NotFound";
import Basket from "../components/basket/Basket";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", Component: Home },
      { path: "catalog", Component: Catalog },
      { path: "catalog/products/:id", Component: ProductDetails },
      { path: "about", Component: About },
      { path: "basket", Component: Basket },
      { path: "/server-error", Component: ServerError },
      { path: "/not-found", Component: NotFound },
      { path: "/*", element: <Navigate to="/not-found" /> },
    ],
  },
]);
