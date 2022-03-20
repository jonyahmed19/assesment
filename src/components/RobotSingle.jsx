import React from "react";

const RobotSingle = ({ robot }) => {
  return (
    <div className="robot">
      <div className="image">
        <img src={robot.pic} alt={robot.firstName + " " + robot.lastName} />
      </div>
      <div className="info">
        <h2>{robot.firstName + " " + robot.lastName}</h2>
        <div className="inner">
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
        </div>
      </div>
    </div>
  );
};

export default RobotSingle;
