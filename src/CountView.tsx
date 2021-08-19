import { Typography, Grid } from "@material-ui/core";
import { LoadingFab } from "./LoadingFab";
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
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      data-testid="count-view"
    >
      <Grid item>
        <Typography variant="h3" component="h2">
          Count: <span data-testid="count-value">{count}</span>
        </Typography>
      </Grid>
      <Grid item>
        <LoadingFab
          color="primary"
          isLoading={isLoading}
          onClick={onClick}
          testId="update-button"
          ariaLabel="update"
        >
          <PlusOneRounded data-testid="plus-one-icon" />
        </LoadingFab>
      </Grid>
    </Grid>
  );
}
