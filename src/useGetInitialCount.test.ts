import { act, renderHook, cleanup } from "@testing-library/react-hooks";
import { useGetInitialCount } from "./useGetInitialCount";

afterEach(() => {
  cleanup();
});

test("renders loading state", async () => {
  const setCount = jest.fn();
  const setError = jest.fn();
  const { result } = renderHook(() =>
    useGetInitialCount({
      count: null,
      setCount,
      setError,
    })
  );
  expect(result.current).toMatchObject({
    isLoading: true,
  });
  expect(setCount).not.toHaveBeenCalled();
  expect(setError).not.toHaveBeenCalled();
});

test("renders loaded state", async () => {
  const setCount = jest.fn();
  const setError = jest.fn();
  const { waitForValueToChange, result } = renderHook(() =>
    useGetInitialCount({
      count: null,
      setCount,
      setError,
    })
  );
  await waitForValueToChange(() => result.current.isLoading);
  expect(result.current).toMatchObject({
    isLoading: false,
  });
  expect(setCount).toHaveBeenCalledWith(234);
  expect(setError).not.toHaveBeenCalled();
});

test("does nothing when count is a number", async () => {
  const setCount = jest.fn();
  const setError = jest.fn();
  const { waitForValueToChange, result } = renderHook(() =>
    useGetInitialCount({
      count: 456,
      setCount,
      setError,
    })
  );
  expect(result.current).toMatchObject({
    isLoading: false,
  });
  expect(setCount).not.toHaveBeenCalled();
  expect(setError).not.toHaveBeenCalled();
});
