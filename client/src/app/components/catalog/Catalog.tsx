import ProductList from "./ProductList";
import { useGetProductsQuery } from "../../api/catalogAPI";
import { Box } from "@mui/material";
import IsLoading from "../layout/IsLoading";

export default function Catalog() {
  // Using a query hook automatically fetches data and returns query values
  const { data, isLoading } = useGetProductsQuery();

  if (!data || isLoading) return <IsLoading text={"Loading catalog..."} />;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ProductList products={data} />
    </Box>
  );
}
