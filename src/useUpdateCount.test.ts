import { act, renderHook, cleanup } from "@testing-library/react-hooks";
import { useUpdateCount } from "./useUpdateCount";

afterEach(() => {
  cleanup();
});

test("renders loading state", async () => {
  const setCount = jest.fn();
  const setError = jest.fn();
  const setRequestEnabled = jest.fn();
  const { result } = renderHook(() =>
    useUpdateCount({
      setCount,
      setError,
      requestEnabled: true,
      setRequestEnabled,
    })
  );
  expect(result.current).toMatchObject({
    isLoading: true,
  });
  expect(setCount).not.toHaveBeenCalled();
  expect(setError).not.toHaveBeenCalled();
  expect(setRequestEnabled).toHaveBeenCalledWith(false);
});

test("renders loaded state", async () => {
  const setCount = jest.fn();
  const setError = jest.fn();
  const setRequestEnabled = jest.fn();
  const { result, waitForValueToChange } = renderHook(() =>
    useUpdateCount({
      setCount,
      setError,
      requestEnabled: true,
      setRequestEnabled,
    })
  );
  await waitForValueToChange(() => result.current.isLoading);
  expect(result.current).toMatchObject({
    isLoading: false,
  });
  expect(setCount).toHaveBeenCalledWith(235);
  expect(setError).not.toHaveBeenCalled();
  expect(setRequestEnabled).toHaveBeenCalledWith(false);
});

test("does nothing when requestEnabled is false", async () => {
  const setCount = jest.fn();
  const setError = jest.fn();
  const setRequestEnabled = jest.fn();
  const { result, waitForValueToChange } = renderHook(() =>
    useUpdateCount({
      setCount,
      setError,
      requestEnabled: false,
      setRequestEnabled,
    })
  );
  expect(result.current).toMatchObject({
    isLoading: false,
  });
  expect(setCount).not.toHaveBeenCalled();
  expect(setError).not.toHaveBeenCalled();
  expect(setRequestEnabled).not.toHaveBeenCalled();
});
