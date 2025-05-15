import { Typography } from "@mui/material";
import { useGetBasketQuery } from "../../api/basketAPI";

export default function Basket() {
  const { data: basket, isLoading } = useGetBasketQuery();

  if (isLoading) return <Typography>Loading basket...</Typography>;

  if (!basket) return <Typography variant="h3">Basket is empty</Typography>;
  return <div>{basket.basketId}</div>;
}
