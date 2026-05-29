import { useState } from "react";

function SearchBar({ setUsername }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    if (input.trim() !== "") {
      setUsername(input);
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={input}
        onChange={(e) =>
          setInput(e.target.value)
        }
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;