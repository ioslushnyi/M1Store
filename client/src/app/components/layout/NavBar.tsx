import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  darkModeSelector,
  isLoadingSelector,
  toggleDarkMode,
} from "../../store/uiSlice";
import { useGetBasketQuery } from "../../api/basketAPI";

export default function NavBar() {
  console.log("navbar");
  const navBarLinks = {
    mid: [
      { title: "home", path: "/home" },
      { title: "catalog", path: "/catalog" },
      { title: "about", path: "/about" },
    ],
    right: [
      { title: "register", path: "/register" },
      { title: "login", path: "/login" },
    ],
  };

  const linkStyles = {
    color: "inherit",
    typography: "h6",
    textDecoration: "none",
    "&:hover": {
      color: "grey.500",
    },
    "&.active": {
      color: "#baecf9",
    },
  };

  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(darkModeSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const { data: basket } = useGetBasketQuery();
  const numberOfItemsInBasket =
    (basket &&
      basket.items.reduce((prev, current) => prev + current.quantity, 0)) ||
    0;

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography component={NavLink} to="/" variant="h6" sx={linkStyles}>
            M1Shop
          </Typography>
          <IconButton
            onClick={() => {
              dispatch(toggleDarkMode());
            }}
          >
            {isDarkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
          </IconButton>
        </Box>

        <List sx={{ display: "flex" }}>
          {navBarLinks.mid.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={linkStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            sx={{ color: "inherit" }}
          >
            <Badge badgeContent={numberOfItemsInBasket} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: "flex" }}>
            {navBarLinks.right.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={{ color: "inherit", typography: "h6" }}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="secondary" />
        </Box>
      )}
    </AppBar>
  );
}
