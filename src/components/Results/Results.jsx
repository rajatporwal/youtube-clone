/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import VideoList from "../VideoList/VideoList";
import VideoPlayback from "../VideoPlayback/VideoPlayback";

const Results = () => {
  const location = useLocation();
  const { data, isPageLoading, getYouTubeData } = useFetch();
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const navigate = useNavigate()

  const currentVideoSelected = (videoSelected) => {
    navigate(`/watch?v=${videoSelected?.id?.videoId}`)
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search_query");
    getYouTubeData(searchQuery || '');

    const vId = searchParams.get("v")
    if(vId) {
      setCurrentVideoId(vId);
    }
    window.scrollTo(0, 0);
  }, [location.search]);

  return (
    <div className="App">
      {isPageLoading && data.videos.length === 0 && <span>Loading...</span>}
      <div className="playback-list-container">
        {currentVideoId && <VideoPlayback videoId={currentVideoId} />}
        {data.videos.length > 0 && (
          <VideoList
            selectedVideo={currentVideoId}
            totalResults={data.totalResults}
            isPageLoading={isPageLoading}
            onSelectVideo={currentVideoSelected}
            videos={data.videos}
            loadMore={() => getYouTubeData(data.query, true)}
          />
        )}
      </div>
    </div>
  );
};

export default Results;
