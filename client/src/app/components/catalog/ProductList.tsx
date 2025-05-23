import { Box } from "@mui/material";
import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        maxWidth: 300 * 3 + 24 * 2,
        justifyContent: "flex-start",
        alignItems: "self-start",
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
}
