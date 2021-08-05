import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setError(true);
        throw new Error('Ответ сети был не ok.');
      }
      const result = await response.json();
      setData(result.data);
    } catch (e) {
      setError(true);
      //console.error('Возникла проблема с вашим fetch запросом: ', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return { data, isError, isLoading };
};
