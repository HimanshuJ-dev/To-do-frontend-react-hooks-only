import { useContext } from "react";
import React, { useState, useEffect } from "react";

import { UserContext } from "../../contexts/userContext";

import ListSamples from "../ListSamples.json";
import Tasks from "../SingleToDo/singleToDo";
import "./List.css";

const List = () => {
  const { currentUser } = useContext(UserContext);

  const [tasks, setTasks] = useState([]);

  // console.log("came into view");

  useEffect(() => {
    fetch(`http://localhost:8080/tasks/?id=${currentUser}`, {
      // http://localhost:8080/tasks/?id=${currentUser}
      method: "GET",
      headers: { "content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((tasks) => {
        setTasks(tasks.tasks);
      });
  }, [])

  return (
    <div className="taskListContainer">
      <h1 className="taskListPageTitle">TASK ZONE</h1>
      {tasks.length > 0 ? (
        <div>
          <Tasks tasks={tasks} />
        </div>
      ) : (
        <div className="noTasksBanner">
          <h1>no tasks</h1>
        </div>
      )}
    </div>
  );

}

export default List;
