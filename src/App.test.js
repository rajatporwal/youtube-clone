import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { getVideosList } from "./service/service";

jest.mock("./service/service", () => ({
  getVideosList: jest.fn()
}));

describe("App Component", () => {
  beforeEach(() => {
    getVideosList.mockResolvedValue({
      videos: [{ id: 1, snippet: { title: "React Tutorial" } }],
      pageToken: "nextPage",
      pageSize: 10,
      totalResults: 100
    });
  });

  test("Check YouTube text is in the document", () => {
    render(<App />);
    const youtubeElement = screen.getByText("YouTube");
    expect(youtubeElement).toBeInTheDocument();
  });

  test("Check YouTube text click event", () => {
    render(<App />);
    const youtubeElement = screen.getByText("YouTube");
    const inputField = screen.getByLabelText("search");

    fireEvent.change(inputField, { target: { value: "react js" } });
    expect(inputField.value).toBe("react js");

    fireEvent.click(youtubeElement);
    expect(inputField.value).toBe("");
  });

  test("Check search input triggers API call on Enter", async () => {
    render(<App />);
    const inputField = screen.getByLabelText("search");

    fireEvent.change(inputField, { target: { value: "React" } });
    fireEvent.keyDown(inputField, { key: "Enter", code: "Enter" });

    await waitFor(() => expect(getVideosList).toHaveBeenCalledWith(expect.objectContaining({ query: "React" })));
  });

  test("Check search button triggers API call", async () => {
    render(<App />);
    const inputField = screen.getByLabelText("search");
    fireEvent.change(inputField, { target: { value: "Vue" } });

    const searchIcon = screen.getByAltText("Search");
    fireEvent.click(searchIcon);

    await waitFor(() => expect(getVideosList).toHaveBeenCalledWith(expect.objectContaining({ query: "Vue" })));
  });

  test("Check loading text appears when fetching data", async () => {
    render(<App />);
    const inputField = screen.getByLabelText("search");
    fireEvent.change(inputField, { target: { value: "React" } });
    fireEvent.keyDown(inputField, { key: "Enter", code: "Enter" });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(getVideosList).toHaveBeenCalled());
  });

  test("Check if API fails, ErrorMessage appears", async () => {
    getVideosList.mockRejectedValue(new Error("API Error"));
    render(<App />);

    const inputField = screen.getByLabelText("search");
    fireEvent.change(inputField, { target: { value: "React" } });
    fireEvent.keyDown(inputField, { key: "Enter", code: "Enter" });

    await waitFor(() => expect(getVideosList).toHaveBeenCalled());
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  test("Check retry button triggers API call again", async () => {
    getVideosList.mockRejectedValueOnce(new Error("API Error"));
    render(<App />);

    const inputField = screen.getByLabelText("search");
    fireEvent.change(inputField, { target: { value: "React" } });
    fireEvent.keyDown(inputField, { key: "Enter", code: "Enter" });

    await waitFor(() => expect(getVideosList).toHaveBeenCalled());
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();

    getVideosList.mockResolvedValueOnce({
      videos: [{ id: "1", snippet: { title: "React Tutorial" } }],
      pageToken: "nextPage",
      pageSize: 10,
      totalResults: 100
    });

    fireEvent.click(screen.getByText("Retry"));
    await waitFor(() => expect(getVideosList).toHaveBeenCalled());
  });
});
