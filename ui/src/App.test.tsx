import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { server } from "./mocks/server.js";
import { rest } from "msw";

test("renders header and avatar components", () => {
  // Given the app renders
  render(<App />);
  // Then the main title should render
  expect(screen.getByText("The Counting App!")).toBeInTheDocument();
  // And the avatar should render
  expect(screen.getByTestId("avatar")).toBeInTheDocument();
});

test("renders initial loading state", () => {
  // Given the app renders
  render(<App />);
  // And the first request has not been sent yet
  // Then the loading view should be visible
  expect(screen.getByTestId("initial-loading-indicator")).toBeInTheDocument();
  expect(screen.queryByTestId("count-view")).not.toBeInTheDocument();
});

test("renders initial loaded state", async () => {
  // Given the app renders
  render(<App />);
  // And the first request to get the count is sent
  // Then the count view should be visible
  await waitFor(() =>
    expect(screen.queryByTestId("count-view")).toBeInTheDocument()
  );
  // And the "initial" loading indicator should not be visible
  expect(
    screen.queryByTestId("initial-loading-indicator")
  ).not.toBeInTheDocument();
  // And the initial count value is visible
  expect(screen.getByTestId("count-value").innerHTML).toEqual("234");
});

test("renders update loading state", async () => {
  // Given the app renders
  render(<App />);
  // And the first request to get the count is sent
  // Then the count view should be visible
  await waitFor(() =>
    expect(screen.queryByTestId("count-view")).toBeInTheDocument()
  );
  // And the update button should be visible
  expect(screen.getByTestId("plus-one-icon")).toBeInTheDocument();

  // When the user clicks the update button
  const button = screen.getByTestId("update-button");
  fireEvent.click(button);

  // Then the loading button is visible
  await waitFor(() =>
    expect(screen.getByTestId("loadingfab-progress")).toBeInTheDocument()
  );

  // And the plus one icon should not be visible
  expect(screen.queryByTestId("plus-one-icon")).not.toBeInTheDocument();

  // And the initial count value is still visible
  expect(screen.getByTestId("count-value").innerHTML).toEqual("234");
});

test("renders update loaded state", async () => {
  // Given the app renders
  render(<App />);
  // And the first request to get the count is sent
  // Then the count view should be visible
  await waitFor(() =>
    expect(screen.queryByTestId("count-view")).toBeInTheDocument()
  );
  // And the update button should be visible
  expect(screen.getByTestId("plus-one-icon")).toBeInTheDocument();

  // When the user clicks the update button
  const button = screen.getByTestId("update-button");
  fireEvent.click(button);

  // Then the loading button is visible
  await waitFor(() =>
    expect(screen.getByTestId("loadingfab-progress")).toBeInTheDocument()
  );

  // And the plus one icon should not be visible
  expect(screen.queryByTestId("plus-one-icon")).not.toBeInTheDocument();

  // When the API request resolves
  // Then the update button should be visible again
  await waitFor(() =>
    expect(screen.getByTestId("plus-one-icon")).toBeInTheDocument()
  );

  // And the updated count value is visible
  expect(screen.getByTestId("count-value").innerHTML).toEqual("235");
});

test("renders error alert when initial request fails", async () => {
  server.use(
    rest.get("/api/count/get", (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({}));
    })
  );

  // Given the app renders
  render(<App />);

  // And the first request to get the count is sent
  // And the request fails
  await waitFor(() =>
    expect(screen.queryByTestId("error-alert")).toBeInTheDocument()
  );
});
