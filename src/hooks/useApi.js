import { useState, useEffect } from 'react';

export function useApi(url, requestOptions) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        console.log(requestOptions)
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          const jsonData = await response.json();          
          const errors = { cause: jsonData['error_description'] }
          throw new Error("An error occurred", errors);
        }
        // const contentType = response.headers.get("content-type");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.log(err)
        setError(err.cause);
      } finally {
        setIsLoading(false);
      }
    };

    if (requestOptions) fetchData();
  }, [requestOptions]);

  return { data, isLoading, error };
};
