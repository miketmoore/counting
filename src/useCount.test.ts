import { act, renderHook } from "@testing-library/react-hooks";
import { useCount } from "./useCount";

import { rest } from "msw";

test("renders default response", async () => {
  act(() => {
    let hookResult;
    act(() => {
      hookResult = renderHook(() => useCount());
    });
    expect(hookResult.result.current).toMatchObject({
      isLoadingInitial: false,
      isLoadingUpdate: false,
      error: null,
      count: 0,
      requestUpdatedCount: expect.any(Function),
    });
  });
});

test("renders initial loading state", async () => {
  let hookResult;
  act(() => {
    hookResult = renderHook(() => useCount());
  });
  // await hookResult.waitForNextUpdate();
  expect(hookResult.result.current).toMatchObject({
    isLoadingInitial: true,
    isLoadingUpdate: false,
    error: null,
    count: 0,
    requestUpdatedCount: expect.any(Function),
  });
});

// import { server } from "./mocks/server";
// // Establish API mocking before all tests.
// beforeAll(() => server.listen());

// // Reset any request handlers that we may add during the tests,
// // so they don't affect other tests.
// afterEach(() => server.resetHandlers());

// // Clean up after the tests are finished.
// afterAll(() => server.close());

// test("renders update loading state", async () => {
//   let hookResult = renderHook(() => useCount());
//   await hookResult.waitForNextUpdate();
//   // expect(hookResult.result.current).toMatchObject({
//   //   isLoadingInitial: true,
//   //   isLoadingUpdate: false,
//   //   error: null,
//   //   count: 0,
//   //   requestUpdatedCount: expect.any(Function),
//   // });

//   // hookResult.result.current.requestUpdatedCount();
//   // act(() => {
//   //   hookResult = renderHook(() => useCount());
//   // });
//   // await hookResult.waitForNextUpdate();
//   // await hookResult.waitForNextUpdate();
//   // expect(hookResult.result.current).toMatchObject({
//   //   isLoadingInitial: false,
//   //   isLoadingUpdate: true,
//   //   error: null,
//   //   count: 123,
//   //   requestUpdatedCount: expect.any(Function),
//   // });
// });
