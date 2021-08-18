import {
  Button,
  CircularProgress,
  LinearProgress,
  Avatar,
  Typography,
  Paper,
  Container,
  Fab,
  Box,
  Grid,
  Snackbar,
} from "@material-ui/core";
import { PlusOneRounded } from "@material-ui/icons";

export function CountView({
  count,
  onClick,
  isLoading,
}: {
  count: number;
  onClick: () => void;
  isLoading: boolean;
}) {
  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h2">
          Count: <span data-testid="count-value">{count}</span>
        </Typography>
      </Grid>
      <Grid item>
        <Fab
          data-testid="update-button"
          color="primary"
          aria-label="update"
          onClick={() => onClick()}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress data-testid="loading-indicator" />
          ) : (
            <PlusOneRounded data-testid="plus-one-icon" />
          )}
        </Fab>
      </Grid>
    </Grid>
  );
}
