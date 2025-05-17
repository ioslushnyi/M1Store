import { ShoppingBasket } from "@mui/icons-material";
import { Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function EmptyBasket() {
  return (
    <Container
      component={Paper}
      sx={{
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ShoppingBasket sx={{ fontSize: 100 }} color="primary" />
      <Typography
        gutterBottom
        variant="h5"
        sx={{ px: 4, pt: 2 }}
        color="secondary"
      >
        Basket is empty
      </Typography>
      <Button component={Link} to="/catalog">
        Go to catalog
      </Button>
    </Container>
  );
}
