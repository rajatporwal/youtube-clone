import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
    let searchChangeHandler;

    beforeEach(() => {
        searchChangeHandler = jest.fn();
        render(<SearchBar searchChangeHandler={searchChangeHandler} />);
    });

    test("Check YouTube text is in the document", () => {
        const youtubeElement = screen.getByText("YouTube");
        expect(youtubeElement).toBeInTheDocument();
    });

    test("Check YouTube text resets search input", () => {
        const youtubeElement = screen.getByText("YouTube");
        const inputField = screen.getByLabelText("search");

        fireEvent.change(inputField, { target: { value: "react js" } });
        expect(inputField.value).toBe("react js");

        fireEvent.click(youtubeElement);
        expect(inputField.value).toBe("");
        expect(searchChangeHandler).toHaveBeenCalledWith("");
    });

    test("Check YouTube logo resets search input", () => {
        const youtubeIcon = screen.getByAltText("YouTube");
        const inputField = screen.getByLabelText("search");

        fireEvent.change(inputField, { target: { value: "angular" } });
        expect(inputField.value).toBe("angular");

        fireEvent.click(youtubeIcon);
        expect(inputField.value).toBe("");
        expect(searchChangeHandler).toHaveBeenCalledWith("");
    });

    test("search input updates on change", () => {
        const inputField = screen.getByLabelText("search");
        fireEvent.change(inputField, { target: { value: "JavaScript" } });
        expect(inputField.value).toBe("JavaScript");
    });

    test("Check Enter key triggers searchChangeHandler", () => {
        const inputField = screen.getByLabelText("search");
        fireEvent.change(inputField, { target: { value: "React" } });
        fireEvent.keyDown(inputField, { key: "Enter", code: "Enter" });

        expect(searchChangeHandler).toHaveBeenCalledWith("React");
    });

    test("Check search button triggers searchChangeHandler", () => {
        const inputField = screen.getByLabelText("search");
        fireEvent.change(inputField, { target: { value: "React" } });

        const searchIcon = screen.getByAltText("Search");
        fireEvent.click(searchIcon);

        expect(searchChangeHandler).toHaveBeenCalledWith("React");
    });

    test("Search input loses focus after searching", () => {
        const inputField = screen.getByLabelText("search");
        fireEvent.change(inputField, { target: { value: "Vue" } });

        inputField.focus();
        expect(document.activeElement).toBe(inputField);

        fireEvent.keyDown(inputField, { key: "Enter", code: "Enter" });

        expect(document.activeElement).not.toBe(inputField);
    });
});
