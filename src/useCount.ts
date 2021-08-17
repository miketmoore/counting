import { useCallback, useDebugValue, useEffect, useState } from "react";
import countapi from "countapi-js";

export const useCount = () => {
  const [requestEnabled, setRequestEnabled] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const sendRequest = useCallback(async () => {
    try {
      const { value } = await countapi.update(
        "***REMOVED***",
        0
      );
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
