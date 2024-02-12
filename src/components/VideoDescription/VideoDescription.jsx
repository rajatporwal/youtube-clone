import { formatTime } from "../../utils/utils";
import "./VideoDescription.css"

const VideoDescription = ({ snippet }) => {
  return (
    <div className="text-container">
      <div aria-label="Video Title" className="video-title">{snippet.title}</div>
      <div aria-label="Video Description container" className="video-description-container">
        <div aria-label="Video Channel Title" className="video-description">{snippet.channelTitle}</div>
        <div aria-label="Video Published" className="video-description">
          Published : {formatTime(snippet.publishTime || snippet.publishedAt)}
        </div>
      </div>
    </div>
  );
};

export default VideoDescription