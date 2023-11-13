import { useRef, useState } from "react";
import "./App.css";
import useGetVideos from "./hooks/useGetVideos";

function App() {
  const [selectedId, setSelectedId] = useState<string>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const { loading: loadingVideos, videos } = useGetVideos();

  const onChangeVideo = (videoId: string) => {
    setSelectedId(videoId);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
  };

  return (
    <div>
      <span className="app-title">Video list</span>
      <div className="video-list">
        {loadingVideos ? (
          <span
            style={{
              margin: "16px",
            }}
          >
            Loading...
          </span>
        ) : (
          videos.map((video) => (
            <div
              className={`video-card ${
                selectedId === video.id ? "video-card-selected" : ""
              }`}
              key={video.id}
              onClick={() => onChangeVideo(video.id)}
            >
              {video.name}
            </div>
          ))
        )}
      </div>
      {selectedId && (
        <video width="480" height="360" controls autoPlay ref={videoRef}>
          <source
            src={`${
              import.meta.env.VITE_API_URL
            }/streaming-videos/${selectedId}`}
            type="video/mp4"
          />
          Your browser is not supported
        </video>
      )}
    </div>
  );
}

export default App;
