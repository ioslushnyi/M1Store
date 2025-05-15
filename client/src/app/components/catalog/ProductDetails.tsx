import { useParams } from "react-router";
import Grid from "@mui/material/Grid";
import {
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

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductDetailsQuery(id ? id : "0");

  if (!product || isLoading)
    return <IsLoading text={"Loading product details..."} />;

  const productDetails = [
    { label: "Description", value: product.description },
    { label: "Type", value: product.type },
    { label: "Brand", value: product.brand },
    { label: "Quanity in stock", value: product.quantityInStock },
  ];

  return (
    <Grid container spacing={6} maxWidth="md" sx={{ mx: "auto" }}>
      <Grid size={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid size={6}>
        <Typography variant="h3">{product.name}</Typography>

        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
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
              label="Quantity in basket"
              fullWidth
              defaultValue={1}
            ></TextField>
          </Grid>
          <Grid size={6}>
            <Button
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
