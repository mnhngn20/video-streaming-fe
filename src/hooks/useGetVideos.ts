import { useEffect, useState } from "react";

export default function useGetVideos() {
  const [videos, setVideos] = useState<{ name: string; id: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/streaming-videos`,
          {
            headers: {
              "Access-Control-Allow-Origin": "http://localhost:3001",
            },
          }
        );
        const data = await response.json();

        setVideos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    videos,
    loading,
  };
}
