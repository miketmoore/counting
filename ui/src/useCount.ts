import { useDebugValue, useEffect, useState } from "react";
import { Count } from "./count-types";
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
  const [initialEnabled, setInitialEnabled] = useState(true);
  const [requestEnabled, setRequestEnabled] = useState(false);
  const [count, setCount] = useState<Count>(null);

  const {
    count: initialCount,
    isLoading: isLoadingInitial,
    error: errorInitial,
  } = useGetInitialCount({
    enabled: initialEnabled,
  });

  useEffect(() => {
    if (initialCount != null) {
      setCount(initialCount);
      setInitialEnabled(false);
    }
  }, [initialCount, setCount, setInitialEnabled]);

  const {
    count: updatedCount,
    isLoading: isLoadingUpdate,
    error: errorUpdated,
  } = useUpdateCount({
    requestEnabled,
    setRequestEnabled,
  });

  useEffect(() => {
    if (updatedCount) {
      setCount(updatedCount);
    }
  }, [updatedCount]);

  useDebugValue(`Count:${count}`);

  return {
    isLoadingInitial,
    isLoadingUpdate,
    error: errorInitial || errorUpdated,
    count: count == null ? 0 : count,
    requestUpdatedCount: () => setRequestEnabled(true),
  };
};
