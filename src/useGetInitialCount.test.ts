import { act, renderHook, cleanup } from "@testing-library/react-hooks";
import { useGetInitialCount } from "./useGetInitialCount";

afterEach(() => {
  cleanup();
});

test("renders loading state", async () => {
  const { result } = renderHook(() =>
    useGetInitialCount({
      enabled: true,
    })
  );
  expect(result.current).toMatchObject({
    isLoading: true,
    count: null,
  });
});

test("renders loaded state", async () => {
  const { waitForValueToChange, result } = renderHook(() =>
    useGetInitialCount({
      enabled: true,
    })
  );
  await waitForValueToChange(() => result.current.isLoading);
  await waitForValueToChange(() => result.current.isLoading);
  expect(result.current).toMatchObject({
    isLoading: false,
    count: 234,
  });
});

test("does nothing when enabled is false", async () => {
  const { waitForValueToChange, result } = renderHook(() =>
    useGetInitialCount({
      enabled: false,
    })
  );
  expect(result.current).toMatchObject({
    isLoading: false,
  });
});
