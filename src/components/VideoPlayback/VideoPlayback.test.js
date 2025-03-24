import { render, screen } from "@testing-library/react";
import VideoPlayback from "./VideoPlayback";
import selectedVideo from "../../mocks/selectedVideo.json";

const embedUrl = "https://www.youtube.com/embed/";

describe("VideoPlayback Component", () => {
  test("Check iFrame is present and has correct title", () => {
    render(<VideoPlayback video={selectedVideo} />);
    const iframe = screen.getByTitle(selectedVideo.snippet.title);

    expect(iframe).toBeInTheDocument();
    expect(iframe.title).toBe(selectedVideo.snippet.title);
  });

  test("Check iFrame src is correct", () => {
    render(<VideoPlayback video={selectedVideo} />);
    const iframe = screen.getByTitle(selectedVideo.snippet.title);
    const expectedUrl = `${embedUrl}${selectedVideo.id.videoId}`;

    expect(iframe).toHaveAttribute("src", expectedUrl);
  });

  test("Check VideoDescription component renders correctly", () => {
    render(<VideoPlayback video={selectedVideo} />);
    const title = screen.getByLabelText("Video Title");
    const channelTitle = screen.getByLabelText("Video Channel Title");

    expect(title).toBeInTheDocument();
    expect(channelTitle).toBeInTheDocument();
  });

  test("Check component handles missing video data gracefully", () => {
    render(<VideoPlayback video={null} />);
    const iframe = screen.queryByRole("iframe");

    expect(iframe).not.toBeInTheDocument();
  });
});
