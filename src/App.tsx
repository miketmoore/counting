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
import MuiAlert from "@material-ui/lab/Alert";
import { CountView } from "./CountView";

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
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Paper
          elevation={6}
          style={{
            padding: 40,
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              <Typography variant="h3" component="h1">
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
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item>
              {isLoadingInitial ? (
                <InitialLoadingView />
              ) : (
                <CountView
                  count={count}
                  onClick={requestUpdatedCount}
                  isLoading={isLoadingUpdate}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
}

export default App;
