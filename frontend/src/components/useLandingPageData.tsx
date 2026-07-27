import { useEffect, useState } from "react";
import { fetchData } from "@/actions/GET";

type LandingPageData = any; // replace with proper type if you have one

export const useLandingPageData = () => {
  const [data, setData] = useState<LandingPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const res = await fetchData({
          url: "visitor/getlandingPageData",
        });

        if (isMounted) {
          setData(res);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getData();

    return () => {
      isMounted = false; // prevent state update after unmount
    };
  }, []);

  return { data, isLoading, error };
};