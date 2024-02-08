import { render, screen } from "@testing-library/react";
import VideoDescription from "./VideoDescription";
import selectedVideo from "../../mocks/selectedVideo.json";
import { formatTime } from "../../utils/utils";

test("Check if VideoDescription component renders without crashing", () => {
  render(<VideoDescription snippet={selectedVideo.snippet} />);
  const textContainer = screen.getByLabelText("Video Description container");
  expect(textContainer).toBeInTheDocument();
});

test("Check Title is Visible and has correct data", () => {
  render(<VideoDescription snippet={selectedVideo.snippet} />);
  const title = screen.getByLabelText("Video Title");
  expect(title).toBeInTheDocument();
  expect(title.textContent).toBe(
    "How to Sprout Lentils &amp; Beans"
  );
});

test("Check Channel title is Visible and has correct data", () => {
  render(<VideoDescription snippet={selectedVideo.snippet} />);
  const channelTitle = screen.getByLabelText("Video Channel Title");
  expect(channelTitle).toBeInTheDocument();
  expect(channelTitle.textContent).toBe("rootedinspice");
});

test("Check Published is Visible and has correct data", () => {
  render(<VideoDescription snippet={selectedVideo.snippet} />);
  const channelPublished = screen.getByLabelText("Video Published");
  expect(channelPublished).toBeInTheDocument();
  expect(channelPublished.textContent).toBe("Published : 19/08/2021");
});

// Mock the formatTime function
test("Check if formatTime function works correctly", () => {
  const mockPublishTime = "2021-04-15T08:00:00.000Z";
  const formattedTime = formatTime(mockPublishTime);
  expect(formattedTime).toBe("15/04/2021");
});