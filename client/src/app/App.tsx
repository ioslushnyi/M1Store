import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import NavBar from "./components/layout/NavBar";
import { Outlet } from "react-router";
import { useAppSelector } from "./store/hooks";
import { selectDarkMode } from "./store/uiSlice";

function App() {
  //const [darkMode, setDarkMode] = useState(false);
  const isDarkMode = useAppSelector(selectDarkMode);
  const paletteType = isDarkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "dark" ? "#121212" : "#e8f8fe",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Box
        sx={{
          minHeight: "100vh",
          background: isDarkMode ? "#121212" : "#e8f8fe",
        }}
      >
        <Container
          sx={{
            mt: 12,
            maxWidth: "xl",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
