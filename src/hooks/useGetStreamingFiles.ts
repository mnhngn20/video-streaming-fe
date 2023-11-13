import { useEffect } from "react";

export default function useGetStreamingFiles({
  selectedId,
}: {
  selectedId?: string;
}) {
  useEffect(() => {
    if (selectedId) {
      (async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/streaming-videos/${selectedId}`
        );

        const data = await response.json();
        console.log(data);
      })();
    }
  }, [selectedId]);

  return {};
}
