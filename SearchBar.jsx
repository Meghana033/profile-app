import { useState } from "react";

const SearchBar = ({
  setUsername
}) => {

  const [searchValue, setSearchValue] =
    useState("");

  // Handle Search
  const handleUserSearch = () => {

    const trimmedValue =
      searchValue.trim();

    if (trimmedValue) {

      setUsername(trimmedValue);

      setSearchValue("");
    }
  };

  // Enter Key Support
  const handleKeyDown = (event) => {

    if (event.key === "Enter") {
      handleUserSearch();
    }
  };

  return (

    <section className="search-container">

      <input
        type="text"
        className="search-input"
        placeholder="Search GitHub Profile..."
        value={searchValue}
        onChange={(event) =>
          setSearchValue(event.target.value)
        }
        onKeyDown={handleKeyDown}
      />

      <button
        className="search-button"
        onClick={handleUserSearch}
      >
        Find User
      </button>

    </section>
  );
};

export default SearchBar;
