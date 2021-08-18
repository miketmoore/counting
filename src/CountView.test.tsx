import {
  fireEvent,
  render,
  screen,
  wait,
  waitFor,
} from "@testing-library/react";
import { CountView } from "./CountView";

test("renders correct text", () => {
  render(<CountView onClick={jest.fn()} count={123} isLoading={false} />);
  expect(screen.getByText(/Count:/i)).toBeInTheDocument();
});

test("onClick handler works when clicking button", async () => {
  const onClick = jest.fn();
  render(<CountView onClick={onClick} count={123} isLoading={false} />);
  const button = screen.getByTestId("update-button");
  fireEvent.click(button);
  await waitFor(() => expect(onClick).toHaveBeenCalledTimes(1));
});

test("loading indicator is visible when isLoading is true", async () => {
  render(<CountView onClick={jest.fn()} count={123} isLoading={true} />);
  await waitFor(() =>
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument()
  );
});

test("loading indicator is hidden when isLoading is false", async () => {
  render(<CountView onClick={jest.fn()} count={123} isLoading={false} />);
  await waitFor(() =>
    expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument()
  );
});

test("icon is hidden when isLoading is true", async () => {
  render(<CountView onClick={jest.fn()} count={123} isLoading={true} />);
  await waitFor(() =>
    expect(screen.queryByTestId("plus-one-icon")).not.toBeInTheDocument()
  );
});

test("icon is visible when isLoading is false", async () => {
  render(<CountView onClick={jest.fn()} count={123} isLoading={false} />);
  await waitFor(() =>
    expect(screen.getByTestId("plus-one-icon")).toBeInTheDocument()
  );
});

test("count value is rendered correctly", async () => {
  render(<CountView onClick={jest.fn()} count={123} isLoading={false} />);
  await waitFor(() =>
    expect(screen.getByTestId("count-value")).toBeInTheDocument()
  );
});
