import React, { useEffect, useState } from "react";
import "./App.css";
import RobotSingle from "./components/RobotSingle";
import SearchBar from "./components/SearchBar";

function App() {
  const [robots, setRobots] = useState([]);
  const [search, setSearch] = useState("");
  const [searchTag, setSearchTag] = useState(null);
  const [tags, setTags] = useState([]);
  const [showform, setShowform] = useState(false);

  const robotFetch = async () => {
    const response = await fetch(
      "https://api.hatchways.io/assessment/students"
    );
    const data = await response.json();
    setRobots(data);
  };

  const searchText = (text) => {
    setSearch(text);
  };

  const filteredRobots = () => {
    const nameSearch = robots?.students?.filter((robot) => {
      const fullName =
        robot?.firstName.toLowerCase() + " " + robot?.lastName.toLowerCase();
      return fullName.includes(search.toLowerCase());
    });
    const combinedSearch = nameSearch?.filter((robot) => {
      if (tags?.length > 0) {
        return tags?.some((tag) => {
          if (searchTag?.length > 0) {
            if (tag.id == robot.id) {
              return tag?.tags.some((item) =>
                item.includes(searchTag.toLowerCase())
              );
            }
          } else {
            return true;
          }
        });
      } else {
        return true;
      }
    });

    return combinedSearch;
  };

  const sessionTags = () => {
    const data = sessionStorage.getItem("tags");
    const getTags = JSON?.parse(data);
    getTags && setShowform(true);
    getTags && setTags(getTags);
    return getTags;
  };

  useEffect(() => {
    if (tags?.length > 0) {
      setShowform(true);
    }
  }, [tags]);

  useEffect(() => {
    robots?.length < 1 && robotFetch();
    sessionTags();
  }, []);

  return (
    <div className="App">
      <SearchBar placeholder={"Search by name"} searchText={searchText} />
      {showform && (
        <SearchBar
          tag={true}
          placeholder="Search by tag"
          setSearchTag={setSearchTag}
        />
      )}
      {filteredRobots() ? (
        filteredRobots()?.map((robot, index) => (
          <RobotSingle sendTags={setTags} key={robot.id} robot={robot} />
        ))
      ) : (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default App;
