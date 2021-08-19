import "./App.css";
import { useCount } from "./useCount";
import {
  CircularProgress,
  Avatar,
  Typography,
  Paper,
  Container,
  Grid,
  Snackbar,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { CountView } from "./CountView";

import "@fontsource/roboto";
import { useState } from "react";
import { useEffect } from "react";

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
  return <CircularProgress data-testid="initial-loading-indicator" />;
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

  const [countsSeen, setCountsSeen] = useState<number[]>([]);

  useEffect(() => {
    if (count > 0 && !countsSeen.includes(count)) {
      setCountsSeen([count, ...countsSeen]);
    }
  }, [count, countsSeen]);

  return (
    <Container>
      <Snackbar open={error != null} autoHideDuration={6000}>
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          data-testid="error-alert"
        >
          An error occurred
        </MuiAlert>
      </Snackbar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Paper
          elevation={6}
          style={{
            padding: 40,
            marginBottom: 20,
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
                data-testid="avatar"
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
        <Paper
          elevation={6}
          style={{
            padding: 40,
            height: 150,
            overflowY: "scroll",
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
              <Typography variant="h5" component="h2">
                Counts Seen
              </Typography>
              <List dense={true}>
                {countsSeen.map((countSeen) => (
                  <ListItem key={countSeen}>
                    <ListItemText primary={countSeen} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
}

export default App;
