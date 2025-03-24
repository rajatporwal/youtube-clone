import { PUBLISHED } from "../../utils/constants";
import { formatTime } from "../../utils/utils";
import "./VideoDescription.css";

const VideoDescription = ({ video }) => {
  const { title = "", channelTitle = "", publishTime = "" } = video.snippet;

  return (
    <div className="text-container">
      <div aria-label="Video Title" className="video-title">
        {title}
      </div>
      <div className="video-description-container">
        <div aria-label="Video Channel Title" className="video-description">
          {channelTitle}
        </div>
        <div aria-label="Video Published" className="video-description">
          {PUBLISHED}: {formatTime(publishTime)}
        </div>
      </div>
    </div>
  );
};

export default VideoDescription;
