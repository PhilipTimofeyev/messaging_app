import { useState, useEffect } from 'react';

export function useApi(url, requestOptions) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
          const jsonData = await response.json();          

          const errors = { cause: jsonData['error_description'] }
          throw new Error("An error occurred", errors);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {

        console.log(err.cause) 
        setError(err.cause);
      } finally {
        setIsLoading(false);
      }
    };

    if (requestOptions) fetchData();
  }, [requestOptions]);

  return { data, isLoading, error };
};
