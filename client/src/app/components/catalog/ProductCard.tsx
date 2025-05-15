import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import type { Product } from "../../types/product";
import { Link } from "react-router";
import { useAddItemToBasketMutation } from "../../api/basketAPI";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [addItemToBasket, { isLoading }] = useAddItemToBasketMutation();
  return (
    <Card
      elevation={3}
      sx={{
        width: 300,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        sx={{ height: 240, backgroundSize: "cover" }}
        image={product.pictureUrl}
        title={product.name}
      ></CardMedia>
      <CardContent>
        <Typography
          sx={{ textTransform: "uppercase" }}
          gutterBottom
          variant="subtitle2"
        >
          {product.name}
        </Typography>
        <Typography variant="h6" sx={{ color: "secondary.main" }}>
          ${(product.price / 100).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          disabled={isLoading}
          onClick={() => addItemToBasket({ product, quantity: 1 })}
        >
          Add to cart
        </Button>
        <Button component={Link} to={`/catalog/products/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
