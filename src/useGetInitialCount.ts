import { useCallback, useEffect, useState } from "react";
import { Count, SetCountFn, SetErrorFn } from "./count-types";

export const useGetInitialCount = ({
  count,
  setCount,
  setError,
}: {
  count: Count;
  setCount: SetCountFn;
  setError: SetErrorFn;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      const handleError = (errorMessage: string) => {
        setError(new Error(errorMessage));
        setIsLoading(false);
      };
      try {
        setIsLoading(true);
        const response = await fetch("/api/count/get", { method: "GET" });
        if (mounted) {
          if (response.status >= 400) {
            handleError("Get request returned an error");
          }
          const { count } = await response.json();
          setIsLoading(false);
          setCount(count);
        }
      } catch (error) {
        handleError("Get request failed");
      }
    };
    if (count == null) {
      fetchData();
    }
    return () => {
      mounted = false;
    };
  }, [count]);

  return {
    isLoading,
  };
};
