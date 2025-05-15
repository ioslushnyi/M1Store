import { Grid, Typography } from "@mui/material";
import { useGetBasketQuery } from "../../api/basketAPI";
import Basketitem from "./Basketitem";
import IsLoading from "../layout/IsLoading";

export default function Basket() {
  const { data: basket, isLoading } = useGetBasketQuery();

  if (isLoading) return <IsLoading text={"Loading basket..."} />;

  if (!basket) return <Typography variant="h5">Basket is empty</Typography>;
  return (
    <Grid container spacing={2}>
      <Grid size={8}>
        {basket.items.map((item) => (
          <Basketitem key={item.productId} item={item} />
        ))}
      </Grid>
    </Grid>
  );
}
