import React from "react";

const SearchBar = ({ searchText, placeholder, tag, setSearchTag }) => {
  const searchRobots = (e) => {
    if (tag) {
      setSearchTag(e.target.value);
    } else {
      searchText(e.target.value);
    }
    e.preventDefault();
  };

  return (
    <div className="searchbar">
      <form>
        <input
          className="text"
          onChange={searchRobots}
          type="text"
          placeholder={placeholder}
        />
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};

export default React.memo(SearchBar);
