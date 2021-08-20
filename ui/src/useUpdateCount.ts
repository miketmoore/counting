import { useState, useEffect, useRef } from "react";

export const useUpdateCount = ({
  requestEnabled,
  setRequestEnabled,
}: {
  requestEnabled: boolean;
  setRequestEnabled: (enabled: boolean) => void;
}) => {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    const sendRequest = async () => {
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
        if (mountedRef.current) {
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
  }, [
    mountedRef,
    requestEnabled,
    setRequestEnabled,
    setError,
    setIsLoading,
    setCount,
  ]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return {
    count,
    isLoading,
    error,
  };
};
