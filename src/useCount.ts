import { useCallback, useDebugValue, useEffect, useState } from "react";
import countapi from "countapi-js";

const apiKey = "***REMOVED***";

type Count = number | null;

const useGetInitialCount = ({
  count,
  setCount,
  setError,
}: {
  count: Count;
  setCount: (count: Count) => void;
  setError: (error: Error) => void;
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
  setCount: (count: Count) => void;
  setError: (error: Error) => void;
  requestEnabled: boolean;
  setRequestEnabled: (enabled: boolean) => void;
}) => {
  const sendRequest = useCallback(async () => {
    try {
      const { value } = await countapi.update(apiKey, 0);
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

  useEffect(() => {
    if (error) {
      // Let the calling code handle the error
      throw error;
    }
  });

  useDebugValue(`Count:${count}`);

  return {
    count,
    requestUpdatedCount: () => setRequestEnabled(true),
  };
};
