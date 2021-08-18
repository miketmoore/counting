import "./App.css";
import { useCount } from "./useCount";
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
import { makeStyles } from "@material-ui/core/styles";
import { PlusOneRounded } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";

import "@fontsource/roboto";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

function InitialLoadingView() {
  return <CircularProgress />;
}

function CountView({
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

function App() {
  const classes = useStyles();

  const {
    isLoadingInitial,
    isLoadingUpdate,
    error,
    count,
    requestUpdatedCount,
  } = useCount();

  return (
    <Container>
      <Snackbar open={error != null} autoHideDuration={6000}>
        <MuiAlert elevation={6} variant="filled" severity="error">
          An error occurred
        </MuiAlert>
      </Snackbar>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="h2" component="h1">
            ***REMOVED***
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            alt="Purple Cow"
            className={classes.avatar}
            src="***REMOVED***"
          />
        </Grid>
      </Grid>
      <section>
        {isLoadingInitial ? (
          <InitialLoadingView />
        ) : (
          <CountView
            count={count}
            onClick={requestUpdatedCount}
            isLoading={isLoadingUpdate}
          />
        )}
      </section>
    </Container>
  );
}

export default App;
