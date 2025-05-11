import { useState, useEffect } from "react";
import { type Product } from "./types/product";
import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import Catalog from "./components/catalog/Catalog";
import NavBar from "./layout/NavBar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "dark" ? "#121212" : "#eaeaea",
      },
    },
  });

  useEffect(() => {
    fetch("https://localhost:5150/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode ? "#121212" : "#eaeaea",
        }}
      >
        <Container sx={{ mt: 12, maxWidth: "xl" }}>
          <Catalog products={products} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
