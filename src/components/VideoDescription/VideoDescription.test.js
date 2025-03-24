import { render, screen } from "@testing-library/react";
import VideoDescription from "./VideoDescription";
import selectedVideo from "../../mocks/selectedVideo.json";

test("renders VideoDescription component without crashing", () => {
  render(<VideoDescription video={selectedVideo} />);
});

test("displays the correct video title", () => {
  render(<VideoDescription video={selectedVideo} />);
  const title = screen.getByLabelText("Video Title");
  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent(
    "Redux Flow - What is Redux and How it work? | React JS Tutorial #14"
  );
});

test("displays the correct channel title", () => {
  render(<VideoDescription video={selectedVideo} />);
  const channelTitle = screen.getByLabelText("Video Channel Title");
  expect(channelTitle).toBeInTheDocument();
  expect(channelTitle).toHaveTextContent("WsCube Tech");
});

test("displays the correct published date", () => {
  render(<VideoDescription video={selectedVideo} />);
  const channelPublished = screen.getByLabelText("Video Published");
  expect(channelPublished).toBeInTheDocument();
  expect(channelPublished).toHaveTextContent("Published: 15/04/2021");
});
