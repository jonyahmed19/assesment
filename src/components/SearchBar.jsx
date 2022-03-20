import React from "react";

const SearchBar = ({ searchText }) => {
  const searchRobots = (e) => {
    searchText(e.target.value);
    e.preventDefault();
  };

  return (
    <div className="searchbar">
      <form action="">
        <input
          onChange={searchRobots}
          type="text"
          placeholder="Search by name"
        />
        <input className="submit" type="submit" />
      </form>
    </div>
  );
};

export default SearchBar;
