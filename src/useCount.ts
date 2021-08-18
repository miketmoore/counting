import { useCallback, useDebugValue, useEffect, useState } from "react";

type Count = number | null;
type SetCountFn = (count: Count) => void;
type SetErrorFn = (error: Error) => void;

const useGetInitialCount = ({
  count,
  setCount,
  setError,
}: {
  count: Count;
  setCount: SetCountFn;
  setError: SetErrorFn;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const getInitialCount = useCallback(async () => {
    const handleError = (errorMessage: string) => {
      setError(new Error(errorMessage));
      setIsLoading(false);
    };
    try {
      setIsLoading(true);
      const response = await fetch("/api/count/get", { method: "GET" });
      if (response.status >= 400) {
        handleError("Get request returned an error");
      }
      const { count } = await response.json();
      setCount(count);
      setIsLoading(false);
    } catch (error) {
      handleError("Get request failed");
    }
  }, [setError, setCount]);

  useEffect(() => {
    if (count == null) {
      getInitialCount();
    }
  });

  return {
    isLoading,
  };
};

const useUpdateCount = ({
  setCount,
  setError,
  requestEnabled,
  setRequestEnabled,
}: {
  setCount: SetCountFn;
  setError: SetErrorFn;
  requestEnabled: boolean;
  setRequestEnabled: (enabled: boolean) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async () => {
    const handleError = (errorMessage: string) => {
      setError(new Error(errorMessage));
      setIsLoading(false);
    };
    try {
      setIsLoading(true);
      const response = await fetch("/api/count/update", { method: "PUT" });
      if (response.status >= 400) {
        handleError("Update request returned an error");
      }
      const { count } = await response.json();
      setCount(count);
      setIsLoading(false);
    } catch (error) {
      handleError("Update request failed");
    }
  }, [setError, setCount]);

  useEffect(() => {
    if (requestEnabled) {
      setRequestEnabled(false);
      sendRequest();
    }
  }, [requestEnabled, setRequestEnabled, sendRequest]);

  return { isLoading };
};

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
