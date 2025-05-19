import { useParams } from "react-router";
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useGetProductDetailsQuery } from "../../api/catalogAPI";
import IsLoading from "../layout/IsLoading";
import { formatPrice } from "../../utils/helpers";
import {
  useAddItemToBasketMutation,
  useGetBasketQuery,
} from "../../api/basketAPI";
import { useState } from "react";
import InBasketBadge from "./InBasketBadge";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductDetailsQuery(id ? id : "0");
  const isInStock = product && product.quantityInStock > 0;
  const { data: basket } = useGetBasketQuery();
  const [triggerAddItemToBasket] = useAddItemToBasketMutation();
  const [selectedQuantity, setSelectedQuantity] = useState("1");
  const quantityInBasket =
    (basket &&
      basket.items.find((item) => item.productId === +id!)?.quantity) ||
    0;

  if (!product || isLoading)
    return <IsLoading text={"Loading product details..."} />;

  const productDetails = [
    { label: "Description", value: product.description },
    { label: "Type", value: product.type },
    { label: "Brand", value: product.brand },
    { label: "Quanity in stock", value: product.quantityInStock },
  ];

  document.body.scrollTop = document.documentElement.scrollTop = 0;

  return (
    <Grid container spacing={6} maxWidth="md" sx={{ mx: "auto" }}>
      <Grid size={6}>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <img
            src={product.pictureUrl}
            alt={product.name}
            style={{
              minWidth: "350px",
              maxWidth: "400px",
              maxHeight: "600px",
            }}
          />
        </Box>
      </Grid>
      <Grid size={6}>
        <Typography variant="h3">{product.name}</Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" color="secondary" sx={{ mt: "5px" }}>
            {formatPrice(product.price)}
          </Typography>
          {quantityInBasket > 0 && <InBasketBadge value={quantityInBasket} />}
        </Box>

        <Divider sx={{ my: 2 }} />
        <TableContainer>
          <Table>
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {detail.label}
                  </TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} marginTop={3}>
          <Grid size={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity"
              fullWidth
              disabled={!isInStock}
              slotProps={{
                htmlInput: { min: 1, max: product.quantityInStock },
              }}
              defaultValue={isInStock ? "1" : "0"}
              onChange={(e) => {
                setSelectedQuantity(e.target.value);
              }}
            ></TextField>
          </Grid>
          <Grid size={6}>
            <Button
              onClick={() =>
                triggerAddItemToBasket({ product, quantity: +selectedQuantity })
              }
              disabled={
                !isInStock || quantityInBasket === product.quantityInStock
              }
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              Add to basket
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
