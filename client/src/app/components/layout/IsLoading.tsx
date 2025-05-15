import { Box, Typography } from "@mui/material";

type Props = {
  text: string;
};

export default function IsLoading({ text }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography>{text}</Typography>
    </Box>
  );
}
