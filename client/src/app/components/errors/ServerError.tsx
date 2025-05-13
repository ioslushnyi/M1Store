import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
  const { state } = useLocation();
  return (
    <Container component={Paper}>
      {state.error ? (
        <>
          <Typography
            gutterBottom
            variant="h3"
            sx={{ px: 4, pt: 2 }}
            color="secondary"
          >
            Server error
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ p: 4 }}>
            {state.error.detail}
          </Typography>
        </>
      ) : (
        <Typography
          gutterBottom
          variant="h5"
          sx={{ px: 4, pt: 2 }}
          color="secondary"
        >
          Server error
        </Typography>
      )}
    </Container>
  );
}
