import { useCallback, useDebugValue, useEffect, useState } from "react";
import countapi from "countapi-js";

const apiKey = "***REMOVED***";

export const useCount = () => {
  const [requestEnabled, setRequestEnabled] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const getInitialCount = useCallback(async () => {
    try {
      const { value } = await countapi.get(apiKey);
      setCount(value);
    } catch (error) {
      setError(error);
    }
  }, [setError]);

  useEffect(() => {
    if (count == null) {
      getInitialCount();
    }
  });

  const sendRequest = useCallback(async () => {
    try {
      const { value } = await countapi.update(apiKey, 0);
      setCount(value);
    } catch (error) {
      setError(new Error("The count request failed"));
    }
  }, [setCount]);

  useEffect(() => {
    if (requestEnabled) {
      setRequestEnabled(false);
      sendRequest();
    }
  }, [requestEnabled, setRequestEnabled, sendRequest]);

  useEffect(() => {
    if (error) {
      // This will be caught by the ErrorBoundary component
      throw error;
    }
  });

  useDebugValue(`Count:${count}`);

  return {
    count,
    requestUpdatedCount: () => setRequestEnabled(true),
  };
};
