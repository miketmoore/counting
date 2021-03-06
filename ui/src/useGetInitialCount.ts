import { useEffect, useRef, useState } from "react";
import { apiBase } from "./config";

export const useGetInitialCount = ({ enabled }: { enabled: boolean }) => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      const handleError = (errorMessage: string) => {
        setError(new Error(errorMessage));
        setIsLoading(false);
      };
      try {
        setIsLoading(true);
        const response = await fetch(`${apiBase}/count/get`, {
          method: "GET",
        });
        if (response.status >= 400) {
          handleError("Get request returned an error");
        }
        const { count } = await response.json();
        if (mountedRef.current) {
          setIsLoading(false);
          setCount(count);
        }
      } catch (error) {
        handleError("Get request failed");
      }
    };
    if (count == null && enabled) {
      fetchData();
    }
  }, [count, enabled]);

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
