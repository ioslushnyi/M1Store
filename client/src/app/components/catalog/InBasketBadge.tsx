import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import { Typography } from "@mui/material";

const shapeStyles = {
  bgcolor: "info.main",
  borderRadius: "3px",
  padding: "5px",
};
const badgeTextContent = (
  <Box sx={shapeStyles}>
    <Typography>In Basket</Typography>
  </Box>
);

type Props = {
  value: number;
};
export default function InBasketBadge({ value }: Props) {
  return (
    <Stack spacing={3} direction="row" sx={{ my: "auto" }}>
      <Badge color="success" badgeContent={value}>
        {badgeTextContent}
      </Badge>
    </Stack>
  );
}
