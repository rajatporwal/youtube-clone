import { render, screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage Component", () => {
    test("Renders error message", () => {
        render(<ErrorMessage retry={jest.fn()} />);
        expect(screen.getByText(/Something went wrong. Please try again./i)).toBeInTheDocument();
    });

    test("Displays retry button", () => {
        render(<ErrorMessage retry={jest.fn()} />);
        const button = screen.getByRole("button", { name: /retry/i });
        expect(button).toBeInTheDocument();
    });

    test("Calls retry function on button click", () => {
        const mockRetry = jest.fn();
        render(<ErrorMessage retry={mockRetry} />);

        const button = screen.getByRole("button", { name: /retry/i });
        fireEvent.click(button);

        expect(mockRetry).toHaveBeenCalledTimes(1);
    });
});
