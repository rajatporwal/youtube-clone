import SearchBar from "./components/SearchBar/SearchBar";
import VideoList from "./components/VideoList/VideoList";
import VideoPlayback from "./components/VideoPlayback/VideoPlayback";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage"; // Import ErrorMessage
import useYouTubeData from "./hooks/useYouTubeData";
import { LOADING } from "./utils/constants";
import "./App.css";

const App = () => {
  const { data, currentVideo, isPageLoading, getYouTubeData, setCurrentVideo, error } = useYouTubeData();

  const currentVideoSelected = (video) => {
    setCurrentVideo(video);
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <SearchBar searchChangeHandler={(text) => getYouTubeData(text)} />

      {error ? (
        <ErrorMessage retry={() => getYouTubeData(data?.query)} />
      ) : (
        <>
          {isPageLoading && data?.videos?.length === 0 && <span>{LOADING}</span>}
          <div className="playback-list-container">
            {!!currentVideo && <VideoPlayback video={currentVideo} />}
            {data?.videos?.length > 0 && (
              <VideoList
                selectedVideo={currentVideo}
                totalResults={data?.totalResults}
                isPageLoading={isPageLoading}
                onSelectVideo={currentVideoSelected}
                videos={data?.videos}
                loadMore={() => getYouTubeData(data?.query, true)}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
