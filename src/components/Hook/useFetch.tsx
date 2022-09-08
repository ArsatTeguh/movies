import { useState, useEffect } from "react";
import axios from "axios";
import { Popular } from "../type";

export default function UseFetch(url: string) {
  const [dataFetch, setDataFetch] = useState<Array<Popular> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setDataFetch(response.data.results);
      setLoading(false)
    } catch (error) {
      setLoading(true)
      setError(error)
      setLoading(false)
    }
  };

  useEffect(() => {
    fetch();
  }, [url]);

  return { dataFetch, loading, error };
}
