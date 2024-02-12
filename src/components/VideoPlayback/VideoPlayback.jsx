/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import VideoDescription from "../VideoDescription/VideoDescription";
import "./VideoPlayback.css";
import { YT_API_KEY } from "../../service/service";

const embedUrl = "https://www.youtube.com/embed/";

const VideoPlayback = ({ videoId }) => {
  const [videoDetails, setVideoDetails] = useState(null);

  const url = `${embedUrl}${videoId}`;

  const fetchVideoDetails = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YT_API_KEY}&part=snippet`
      );
      const res = await response.json()
      setVideoDetails(res.items[0]);
    } catch (error) {
      console.error('Error fetching video details:', error);
    }
  };

  useEffect(() => {
    fetchVideoDetails()
  }, [])

  return (
    <div aria-label="playback" className="playback">
      <div className="playback-container">
        <iframe
          title={videoDetails?.snippet?.title}
          className="playback-frame"
          src={url}
        ></iframe>
      </div>

      {videoDetails && <VideoDescription snippet={videoDetails.snippet}/>}
    </div>
  );
};

export default VideoPlayback;
