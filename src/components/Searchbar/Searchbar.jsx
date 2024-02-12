/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faVideo,
  faGripHorizontal,
  faBell,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Searchbar.css";

const Searchbar = (props) => {
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get("search_query");
    setSearchText(searchQuery);
  }, []);

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      props.searchChangeHandler(searchText);
    }
  };

  const handleSearchClick = (e) => {
    props.searchChangeHandler(searchText);
  };

  const homeClicked = () => {
    setSearchText("");
    window.location.replace("/");
  };

  return (
    <div className="header">
      <div className="header__left">
        <span className="search-bar-home" onClick={homeClicked}>
          YouTube
        </span>
      </div>

      <div className="header__search">
        <input
          type="text"
          data-testid="search-input"
          placeholder="Search"
          value={searchText || ''}
          onKeyDown={(event) => handleSubmit(event)}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="button"
          data-testid="youtube-search-button"
          disabled={!searchText}
          onClick={handleSearchClick}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className="icons__container">
        <FontAwesomeIcon
          className="header__icons"
          icon={faVideo}
          style={{ marginRight: "20px", width: "20px", height: "20px" }}
        />
        <FontAwesomeIcon className="header__icons" icon={faGripHorizontal} />
        <FontAwesomeIcon className="header__icons" icon={faBell} />
        <FontAwesomeIcon className="header__icons" icon={faUserCircle} />
      </div>
    </div>
  );
};

export default Searchbar;
