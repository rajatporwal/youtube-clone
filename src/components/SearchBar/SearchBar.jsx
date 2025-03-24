import { useState, useRef } from "react";
import { YOUTUBE } from "../../utils/constants";
import "./SearchBar.css";

const SearchBar = ({ searchChangeHandler }) => {
    const [searchText, setSearchText] = useState("");
    const inputRef = useRef(null);

    const handleChange = (event) => setSearchText(event.target.value);

    const handleSearch = (text) => {
        setSearchText(text);
        searchChangeHandler(text);
        inputRef.current?.blur(); // Removes focus from input after search
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") handleSearch(event.target.value);
    };

    const handleHomeClick = () => handleSearch("");

    return (
        <div className="search-bar">
            <span className="search-bar-home" onClick={handleHomeClick}>{YOUTUBE}</span>
            <img src="/youtubeIcon.svg" alt="YouTube" className="youtube-icon" onClick={handleHomeClick} />

            <div className="search-input-container">
                <input
                    ref={inputRef}
                    id="search-input"
                    data-testid="search-input"
                    type="text"
                    value={searchText}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    aria-label="search"
                    placeholder="Search..."
                />
                <img
                    src="/searchIcon.svg"
                    alt="Search"
                    className="search-icon"
                    onClick={() => handleSearch(searchText)}
                />
            </div>
        </div>
    );
};

export default SearchBar;

