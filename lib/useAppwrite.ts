import { useEffect, useState } from "react";

const useAppwrite = (fn: () => any) => {
  const [data, setData] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
        console.log(response);
      setData(response);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refetch = () => fetchData();
//   console.log(data);
  return { data, refetch };
};

export default useAppwrite;
