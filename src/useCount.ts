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
  const getInitialCount = useCallback(async () => {
    try {
      const { value } = await countapi.get(apiKey);
      setCount(value);
    } catch (error) {
      setError(error);
    }
  }, [setError, setCount]);

  useEffect(() => {
    if (count == null) {
      getInitialCount();
    }
  });
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
  const sendRequest = useCallback(async () => {
    try {
      const { value } = await countapi.update(apiKey, incrementAmount);
      setCount(value);
    } catch (error) {
      setError(error);
    }
  }, [setError, setCount]);

  useEffect(() => {
    if (requestEnabled) {
      setRequestEnabled(false);
      sendRequest();
    }
  }, [requestEnabled, setRequestEnabled, sendRequest]);
};

export const useCount = () => {
  const [requestEnabled, setRequestEnabled] = useState(false);
  const [count, setCount] = useState<Count>(null);
  const [error, setError] = useState<Error | null>(null);

  useGetInitialCount({ count, setCount, setError });

  useUpdateCount({ setCount, setError, requestEnabled, setRequestEnabled });

  useDebugValue(`Count:${count}`);

  return {
    isLoading: count == null,
    error,
    count: count == null ? 0 : count,
    requestUpdatedCount: () => setRequestEnabled(true),
  };
};
