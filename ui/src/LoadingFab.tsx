import { CircularProgress, Fab, PropTypes } from "@material-ui/core";

export function LoadingFab({
  testId,
  ariaLabel,
  isLoading,
  onClick,
  children,
  color,
}: {
  testId?: string;
  ariaLabel?: string;
  isLoading: boolean;
  onClick: () => void;
  children: JSX.Element;
  color: PropTypes.Color;
}) {
  return (
    <Fab
      data-testid={testId}
      color={color}
      aria-label={ariaLabel}
      onClick={() => onClick()}
      disabled={isLoading}
    >
      {isLoading ? (
        <CircularProgress data-testid="loadingfab-progress" />
      ) : (
        children
      )}
    </Fab>
  );
}
