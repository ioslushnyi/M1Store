import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import {
  useLazyGetBadRequestErrorQuery,
  useLazyGetNotFoundErrorQuery,
  useLazyGetServerErrorQuery,
  useLazyGetUnauthorizedErrorQuery,
  useLazyGetValidationErrorQuery,
} from "../../api/errorAPI";
import { useState } from "react";

export default function About() {
  const [validationErrors, setValidationErrors] = useState([]);

  const [triggerNotFoundError] = useLazyGetNotFoundErrorQuery();
  const [triggerBadRequestError] = useLazyGetBadRequestErrorQuery();
  const [triggerAuthorizationError] = useLazyGetUnauthorizedErrorQuery();
  const [triggerValidationError] = useLazyGetValidationErrorQuery();
  const [triggerServerError] = useLazyGetServerErrorQuery();

  const getValidationError = async () => {
    try {
      await triggerValidationError().unwrap();
    } catch (err: any) {
      setValidationErrors(err.message.split(", "));
    }
  };

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
        <Button variant="contained" onClick={getValidationError}>
          Validation error
        </Button>
        <Button
          variant="contained"
          onClick={() => triggerServerError().catch((err) => console.log(err))}
        >
          Server error
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 && (
        <Alert severity="error">
          <AlertTitle>ValidationErrors</AlertTitle>
          <List>
            {validationErrors.map((err) => (
              <ListItem key={err}>{err}</ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}
