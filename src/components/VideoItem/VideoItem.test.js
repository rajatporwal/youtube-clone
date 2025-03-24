import { render, screen, fireEvent } from "@testing-library/react";
import VideoItem from "./VideoItem";
import selectedVideo from "../../mocks/selectedVideo.json";

describe("VideoItem Component", () => {
    const mockOnSelectVideo = jest.fn();

    test("Check if VideoItem renders correctly", () => {
        render(
            <VideoItem video={selectedVideo} onSelectVideo={mockOnSelectVideo} />
        );

        const videoItem = screen.getByLabelText("list-group-item");
        expect(videoItem).toBeInTheDocument();
    });

    test("Check if VideoItem renders video thumbnail", () => {
        render(
            <VideoItem video={selectedVideo} onSelectVideo={mockOnSelectVideo} />
        );

        const thumbnail = screen.getByLabelText("video-thumbnail");
        expect(thumbnail).toBeInTheDocument();
        expect(thumbnail).toHaveAttribute(
            "src",
            selectedVideo.snippet.thumbnails.default.url
        );
    });

    test("Check if VideoItem handles click event correctly", () => {
        render(
            <VideoItem video={selectedVideo} onSelectVideo={mockOnSelectVideo} />
        );

        const videoItem = screen.getByLabelText("list-group-item");
        fireEvent.click(videoItem);

        expect(mockOnSelectVideo).toHaveBeenCalledTimes(1);
        expect(mockOnSelectVideo).toHaveBeenCalledWith(selectedVideo);
    });

    test("Check if VideoDescription component renders correctly", () => {
        render(
            <VideoItem video={selectedVideo} onSelectVideo={mockOnSelectVideo} />
        );

        const title = screen.getByLabelText("Video Title");
        expect(title).toBeInTheDocument();
    });
});
