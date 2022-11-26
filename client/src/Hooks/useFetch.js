import React, { useEffect, useState } from "react";

// custom hook only returns data, no visual effects
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const FetchesFunction = async () => {
    setIsLoading(true);
    const response = await fetch(url);
    const result = await response.json();
    setData(result);
  };

  // after every render //?
  useEffect(() => {
    setIsLoading(true);
    try {
      FetchesFunction();
    } catch {
      // setError(err.message);
      console.log("set error");
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
