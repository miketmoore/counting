import { useCallback, useState, useEffect } from "react";
import { SetCountFn, SetErrorFn } from "./count-types";

export const useUpdateCount = ({
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

  useEffect(() => {
    let mounted = true;
    const sendRequest = async () => {
      const handleError = (errorMessage: string) => {
        setError(new Error(errorMessage));
        setIsLoading(false);
      };
      try {
        setIsLoading(true);
        const response = await fetch("/api/count/update", { method: "PUT" });
        if (mounted) {
          if (response.status >= 400) {
            handleError("Update request returned an error");
          }
          const { count } = await response.json();
          setCount(count);
          setIsLoading(false);
        }
      } catch (error) {
        handleError("Update request failed");
      }
    };
    if (requestEnabled) {
      setRequestEnabled(false);
      sendRequest();
    }
    return () => {
      mounted = false;
    };
  }, [requestEnabled, setRequestEnabled]);

  return { isLoading };
};
