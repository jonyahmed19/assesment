import React, { useEffect, useState } from "react";
import "./App.css";
import RobotSingle from "./components/RobotSingle";
import SearchBar from "./components/SearchBar";

function App() {
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const filteredRobots = robots?.students?.filter((robot) => {
    return robot?.firstName.toLowerCase().includes(search.toLowerCase());
  });
  console.log("filterd", filteredRobots);

  useEffect(() => {
    robotFetch();
  }, []);

  return (
    <div className="App">
      <SearchBar searchText={searchText} />
      {filteredRobots?.map((robot, index) => (
        <RobotSingle key={robot.id} robot={robot} />
      ))}
    </div>
  );
}

export default App;
