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
          Count: {count}
        </Typography>
      </Grid>
      <Grid item>
        <Fab
          color="primary"
          aria-label="update"
          onClick={() => onClick()}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress /> : <PlusOneRounded />}
        </Fab>
      </Grid>
    </Grid>
  );
}
