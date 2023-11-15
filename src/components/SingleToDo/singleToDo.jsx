import './singleToDo.css';
import { Link, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { useState, useEffect } from 'react';

import List from '../List/List';

const ToDo = ({ tasks }) => {

  const navigate = useNavigate();
  // console.log("this worked from single todo")
  const taskList = tasks.map((task, index) => {

    

    return (
      <div className={`singleTaskContainer ${task.priority}`}>
        <Link className="linkMaker" to={"/edit-task"} state={task}>
          <div>
            <div className="singleTaskIdAndTitleCont">
              <div className={`singleTaskId ${task.priority}`}>
                <h1>#{index + 1}</h1>
              </div>
              <div className="singleTaskTitle">
                <h1>{task.title}</h1>
              </div>
            </div>
            <div className={`singleTaskBreakLine ${task.priority}`} />
            <div className={`singleTaskPriority ${task.priority}`}>
              <h4>
                {task.priority}
                {task.priority === "urgent" && (
                  <i className="fa fa-hourglass-start"></i>
                )}
                {task.priority === "completed" && (
                  <i className="fa fa-check"></i>
                )}

                {task.priority === "high" && <i className="fa fa-clock"></i>}
                {task.priority === "normal" && (
                  <i className="fa fa-calender"></i>
                )}
                {task.priority === "cancelled" && (
                  <i className="fa fa-circle-xmark"></i>
                )}
              </h4>
            </div>
            <div className="singleTaskDescription">
              <h5>Description: {task.description}</h5>
            </div>
          </div>
        </Link>
      </div>
    );
  })

  return taskList  
};

export default ToDo;



// <div className="singleTaskContainer">
//   <div className="singleTaskIdAndTitleCont">
//     <h3 className="singleTaskTitle">{task.title}</h3>
//   </div>
//   <div className="singleTaskBreakLine"></div>
//   <h5 className="singleTaskDesc">{task.description}</h5>
// </div>;