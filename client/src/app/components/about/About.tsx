import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import {
  useLazyGetBadRequestErrorQuery,
  useLazyGetNotFoundErrorQuery,
  useLazyGetServerErrorQuery,
  useLazyGetUnauthorizedErrorQuery,
  useLazyGetValidationErrorQuery,
} from "../../api/errorAPI";

export default function About() {
  const [triggerNotFoundError] = useLazyGetNotFoundErrorQuery();
  const [triggerBadRequestError] = useLazyGetBadRequestErrorQuery();
  const [triggerAuthorizationError] = useLazyGetUnauthorizedErrorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();
  const [triggerServerError] = useLazyGetServerErrorQuery();
  return (
    <Container maxWidth="lg">
      <Typography gutterBottom variant="h3">
        Errors for testing
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            triggerNotFoundError().catch((err) => {
              console.log(err);
            })
          }
        >
          Not found
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            triggerBadRequestError().catch((err) => console.log(err))
          }
        >
          Bad request
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            triggerAuthorizationError().catch((err) => console.log(err))
          }
        >
          Authorization error
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            triggerValidationError().catch((err) => console.log(err))
          }
        >
          Validation error
        </Button>
        <Button
          variant="contained"
          onClick={() => triggerServerError().catch((err) => console.log(err))}
        >
          Server error
        </Button>
      </ButtonGroup>
    </Container>
  );
}
