import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
import type { Item } from "../../types/basket";
import { Add, Close, Remove } from "@mui/icons-material";
import {
  useAddItemToBasketMutation,
  useRemoveItemFromBasketMutation,
} from "../../api/basketAPI";
import { formatPrice } from "../../utils/helpers";

type Props = {
  item: Item;
};
export default function Basketitem({ item }: Props) {
  const [addItemToBasket] = useAddItemToBasketMutation();
  const [removeItemFromBasket] = useRemoveItemFromBasketMutation();
  return (
    <Paper
      sx={{
        height: 140,
        borderRadius: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src={item.product.pictureUrl}
          alt={item.product.name}
          sx={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: "4px",
            mr: 8,
            ml: 4,
          }}
        />
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6">{item.product.name}</Typography>

          <Box display="flex" alignItems="center" gap={3}>
            <Typography sx={{ fontSize: "1.1rem" }}>
              {formatPrice(item.product.price)} x {item.quantity}
            </Typography>
            <Typography sx={{ fontSize: "1.1rem" }} color="secondary">
              {formatPrice(item.price)}
            </Typography>
          </Box>

          <Grid container spacing={1} alignItems="center">
            <IconButton
              onClick={() =>
                removeItemFromBasket({
                  productId: item.productId,
                  quantity: 1,
                })
              }
              color="warning"
              size="small"
              sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
            >
              <Remove />
            </IconButton>
            <Typography variant="h6">{item.quantity}</Typography>
            <IconButton
              onClick={() =>
                addItemToBasket({ product: item.product, quantity: 1 })
              }
              color="success"
              size="small"
              sx={{ border: 1, borderRadius: 1, minWidth: 0 }}
            >
              <Add />
            </IconButton>
          </Grid>
        </Box>
      </Box>

      <IconButton
        onClick={() =>
          removeItemFromBasket({
            productId: item.productId,
            quantity: item.quantity,
          })
        }
        color="error"
        size="small"
        sx={{
          border: 1,
          borderRadius: 1,
          minWidth: 0,
          alignSelf: "start",
          mr: 1,
          mt: 1,
        }}
      >
        <Close />
      </IconButton>
    </Paper>
  );
}
