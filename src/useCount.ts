import { useCallback, useDebugValue, useEffect, useState } from "react";
import { Count, SetCountFn, SetErrorFn } from "./count-types";
import { useGetInitialCount } from "./useGetInitialCount";
import { useUpdateCount } from "./useUpdateCount";

interface UseCountResponse {
  isLoadingInitial: boolean;
  isLoadingUpdate: boolean;
  error: Error | null;
  count: number;
  requestUpdatedCount: () => void;
}

type UseCount = () => UseCountResponse;

export const useCount: UseCount = () => {
  const [requestEnabled, setRequestEnabled] = useState(false);
  const [count, setCount] = useState<Count>(null);
  const [error, setError] = useState<Error | null>(null);

  const { isLoading: isLoadingInitial } = useGetInitialCount({
    count,
    setCount,
    setError,
  });

  const { isLoading: isLoadingUpdate } = useUpdateCount({
    setCount,
    setError,
    requestEnabled,
    setRequestEnabled,
  });

  useDebugValue(`Count:${count}`);

  return {
    isLoadingInitial,
    isLoadingUpdate,
    error,
    count: count == null ? 0 : count,
    requestUpdatedCount: () => setRequestEnabled(true),
  };
};
