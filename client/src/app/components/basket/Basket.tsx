import { Grid } from "@mui/material";
import { useGetBasketQuery } from "../../api/basketAPI";
import IsLoading from "../layout/IsLoading";
import OrderSummary from "../shared/OrderSummary";
import BasketItem from "./Basketitem";
import EmptyBasket from "./EmptyBasket";

export default function Basket() {
  const { data: basket, isLoading } = useGetBasketQuery();

  if (isLoading) return <IsLoading text={"Loading basket..."} />;

  if (!basket || basket.items.length === 0) return <EmptyBasket />;
  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        {basket.items.map((item) => (
          <BasketItem key={item.productId} item={item} />
        ))}
      </Grid>
      <Grid size={4}>
        <OrderSummary />
      </Grid>
    </Grid>
  );
}
