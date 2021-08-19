import { act, cleanup, renderHook } from "@testing-library/react-hooks";
import { useCount } from "./useCount";

afterEach(() => {
  cleanup();
});

test("renders initial loading state", async () => {
  const hookResult = renderHook(() => useCount());
  expect(hookResult.result.current).toMatchObject({
    isLoadingInitial: true,
    isLoadingUpdate: false,
    error: null,
    count: 0,
    requestUpdatedCount: expect.any(Function),
  });
});

test("renders loaded initial state", async () => {
  const hookResult = renderHook(() => useCount());
  await hookResult.waitForValueToChange(
    () => hookResult.result.current.isLoadingInitial
  );
  expect(hookResult.result.current).toMatchObject({
    isLoadingInitial: false,
    isLoadingUpdate: false,
    error: null,
    count: 234,
    requestUpdatedCount: expect.any(Function),
  });
});

test("renders update loading state", async () => {
  const hookResult = renderHook(() => useCount());
  await hookResult.waitForValueToChange(
    () => hookResult.result.current.isLoadingInitial
  );
  act(() => {
    hookResult.result.current.requestUpdatedCount();
  });
  expect(hookResult.result.current).toMatchObject({
    isLoadingInitial: false,
    isLoadingUpdate: true,
    error: null,
    count: 234,
    requestUpdatedCount: expect.any(Function),
  });
});

test("renders update loaded state", async () => {
  const hookResult = renderHook(() => useCount());
  await hookResult.waitForValueToChange(
    () => hookResult.result.current.isLoadingInitial
  );
  expect(hookResult.result.current).toMatchObject({
    isLoadingInitial: false,
    isLoadingUpdate: false,
    error: null,
    count: 234,
    requestUpdatedCount: expect.any(Function),
  });

  act(() => hookResult.result.current.requestUpdatedCount());

  await hookResult.waitForValueToChange(
    () => hookResult.result.current.isLoadingUpdate
  );

  expect(hookResult.result.current).toMatchObject({
    isLoadingInitial: false,
    isLoadingUpdate: false,
    error: null,
    count: 235,
    requestUpdatedCount: expect.any(Function),
  });
});
