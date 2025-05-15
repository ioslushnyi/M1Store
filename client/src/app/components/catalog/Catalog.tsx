import ProductList from "./ProductList";
import { useGetProductsQuery } from "../../api/catalogAPI";
import { Box } from "@mui/material";

export default function Catalog() {
  // Using a query hook automatically fetches data and returns query values
  const { data, isLoading } = useGetProductsQuery();

  if (!data || isLoading) return <div>Loading...</div>;

  return (
    <Box>
      <ProductList products={data} />
    </Box>
  );
}
