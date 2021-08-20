import { act, renderHook, cleanup } from "@testing-library/react-hooks";
import { useUpdateCount } from "./useUpdateCount";

afterEach(() => {
  cleanup();
});

test("renders loading state", async () => {
  const setRequestEnabled = jest.fn();
  const { result } = renderHook(() =>
    useUpdateCount({
      requestEnabled: true,
      setRequestEnabled,
    })
  );
  expect(result.current).toMatchObject({
    count: null,
    isLoading: true,
    error: null,
  });
  expect(setRequestEnabled).toHaveBeenCalledWith(false);
});

test("renders loaded state", async () => {
  const setRequestEnabled = jest.fn();
  const { result, waitForValueToChange } = renderHook(() =>
    useUpdateCount({
      requestEnabled: true,
      setRequestEnabled,
    })
  );
  await waitForValueToChange(() => result.current.isLoading);
  expect(result.current).toMatchObject({
    count: 235,
    isLoading: false,
    error: null,
  });
  expect(setRequestEnabled).toHaveBeenCalledWith(false);
});

test("does nothing when requestEnabled is false", async () => {
  const setRequestEnabled = jest.fn();
  const { result, waitForValueToChange } = renderHook(() =>
    useUpdateCount({
      requestEnabled: false,
      setRequestEnabled,
    })
  );
  expect(result.current).toMatchObject({
    count: null,
    isLoading: false,
    error: null,
  });
  expect(setRequestEnabled).not.toHaveBeenCalled();
});
