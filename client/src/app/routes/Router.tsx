import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../components/home/Home";
import Catalog from "../components/catalog/Catalog";
import ProductDetails from "../components/catalog/ProductDetails";
import About from "../components/about/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", Component: Home },
      { path: "catalog", Component: Catalog },
      { path: "catalog/products/:id", Component: ProductDetails },
      { path: "about", Component: About },
    ],
  },
]);

export default router;
