import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router";

type Props = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};

export default function NavBar({ darkMode, setDarkMode }: Props) {
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

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };
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
          <IconButton onClick={handleDarkModeToggle}>
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
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
          <IconButton size="large" sx={{ color: "inherit" }}>
            <Badge badgeContent={4} color="secondary">
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
    </AppBar>
  );
}
