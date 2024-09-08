import { useEffect, useState } from "react";

const useAppwrite = (fn: () => any) => {
  const [data, setData] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      console.lconsole.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const refetch = () => fetchData();
  return { data, refetch };
};

export default useAppwrite;
