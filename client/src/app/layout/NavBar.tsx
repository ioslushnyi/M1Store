import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

type Props = {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
};
export default function NavBar({ darkMode, setDarkMode }: Props) {
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">M1Shop</Typography>
        <IconButton onClick={handleDarkModeToggle}>
          {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
