import React, { useEffect, useState } from "react";

// custom hook only returns data, no visual effects
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const FetchesFunction = async () => {
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
      setError(error);
      console.log("set error", error);
    } finally {
      // console.log("data", data);
      // console.log("isLoading", isLoading);
      setIsLoading(false);
    }
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
