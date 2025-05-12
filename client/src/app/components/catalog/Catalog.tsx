import ProductList from "./ProductList";
import { useGetProductsQuery } from "../../api/catalogAPI";

export default function Catalog() {
  // Using a query hook automatically fetches data and returns query values
  const { data, isLoading } = useGetProductsQuery();

  if (!data || isLoading) return <div>Loading...</div>;

  return (
    <>
      <ProductList products={data} />
    </>
  );
}
