import { useCallback, useDebugValue, useEffect, useState } from "react";
import countapi from "countapi-js";

const apiKey = "***REMOVED***";
const incrementAmount = 1;

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
    try {
      setIsLoading(true);
      const { value } = await countapi.get(apiKey);
      setCount(value);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
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
    setIsLoading(true);
    try {
      const { value } = await countapi.update(apiKey, incrementAmount);
      setCount(value);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
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

export const useCount = () => {
  const [requestEnabled, setRequestEnabled] = useState(false);
  const [count, setCount] = useState<Count>(null);
  const [error, setError] = useState<Error | null>(null);

  const { isLoading: isGetLoading } = useGetInitialCount({
    count,
    setCount,
    setError,
  });

  const { isLoading: isUpdateLoading } = useUpdateCount({
    setCount,
    setError,
    requestEnabled,
    setRequestEnabled,
  });

  useDebugValue(`Count:${count}`);

  return {
    // TODO differentiate because I want to show different loading UX
    isLoading: isGetLoading || isUpdateLoading,
    error,
    count: count == null ? 0 : count,
    requestUpdatedCount: () => setRequestEnabled(true),
  };
};
