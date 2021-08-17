import { useCallback, useDebugValue, useEffect, useState } from "react";
import countapi from "countapi-js";

export const useCount = () => {
  const [requestEnabled, setRequestEnabled] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  const sendRequest = useCallback(async () => {
    // try {
    //   const {value} = await countapi.update('***REMOVED***', 0)
    //   setCount(value)
    // } catch (error) {
    //     console.error(error)
    throw new Error("The count request failed");
    // }
  }, [setCount]);

  useEffect(() => {
    if (requestEnabled) {
      setRequestEnabled(false);
      sendRequest();
    }
  }, [requestEnabled, setRequestEnabled, sendRequest]);

  useDebugValue(`Count:${count}`);

  return {
    count,
    requestUpdatedCount: () => setRequestEnabled(true),
  };
};
