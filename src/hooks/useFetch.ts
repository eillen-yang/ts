import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch(() => setError("데이터 불러오기 실패"))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
