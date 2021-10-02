import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestHttp, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestHttp.url, {
        method: requestHttp.method ? requestHttp.method : "GET",
        headers: requestHttp.headers ? requestHttp.headers : {},
        body: requestHttp.body ? JSON.stringify(requestHttp.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
