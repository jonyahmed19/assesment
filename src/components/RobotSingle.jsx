import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const RobotSingle = ({ robot, sendTags }) => {
  const [details, setDetails] = useState(false);
  const [tags, setTags] = useState([]);

  const addTags = (e) => {
    const value = e.target[0].value.toLowerCase();
    setter(value);

    e.target[0].value = "";
    e.preventDefault();
  };

  const getter = () => {
    const getItem = sessionStorage.getItem("tags");
    const getTags = JSON.parse(getItem);
    setTags(getTags);
    sendTags(getTags);

    return getTags;
  };

  const setter = (value) => {
    if (tags) {
      const match = tags?.some((tag) => tag.id == robot.id);
      if (match) {
        const get = getter();
        get?.some((tag) => {
          if (tag.id == robot.id) {
            tag.tags.push(value);
            sessionStorage.setItem("tags", JSON.stringify(get));
            return true;
          }
        });
      } else {
        const get = getter();
        get.push({
          id: robot.id,
          tags: [value],
        });
        sessionStorage.setItem("tags", JSON.stringify(get));
      }
    } else {
      const tagsData = [];
      tagsData.push({
        id: robot.id,
        tags: [value],
      });
      sessionStorage.setItem("tags", JSON.stringify(tagsData));
    }
    getter();
  };
  useEffect(() => {
    getter();
  }, []);

  return (
    <div className="robot">
      <div className="left">
        <div className="image">
          <img src={robot.pic} alt={robot.firstName + " " + robot.lastName} />
        </div>

        <div className="info">
          <div className="inner-top">
            <h2>
              {robot.firstName.toUpperCase() +
                " " +
                robot.lastName.toUpperCase()}
            </h2>
          </div>
          <div className="inner-bottom">
            <p>Email: {robot.email}</p>
            <p>Company: {robot.company}</p>
            <p>Skill: {robot.skill}</p>
            <p>Email: {robot.skill}</p>
            <p>
              Average:{" "}
              {robot.grades.reduce(
                (a, b) => parseInt(a) + parseInt(b) / robot.grades.length,
                0
              )}
              %
            </p>

            {tags?.length > 0 ? (
              <div className="tag-btn-area">
                {tags.map((tag, index) => {
                  if (tag.id == robot.id) {
                    return tag?.tags.map((item, index) => (
                      <button key={tag.id + index}>{item}</button>
                    ));
                  }
                })}
              </div>
            ) : (
              ""
            )}

            <div
              className="hidden-details"
              style={
                details === false ? { display: "none" } : { display: "block" }
              }
            >
              {robot.grades.map((grade, index) => (
                <p key={index}>
                  Test {index + 1}: {grade}%
                </p>
              ))}
            </div>
            <div className="tag-area">
              <form onSubmit={addTags}>
                <input
                  placeholder="Add a tag"
                  type="text"
                  className="tag-field"
                />
                <input type="submit" className="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <span onClick={() => setDetails(!details)}>
          {details ? <FaMinus /> : <FaPlus />}
        </span>
      </div>
    </div>
  );
};

export default React.memo(RobotSingle);
