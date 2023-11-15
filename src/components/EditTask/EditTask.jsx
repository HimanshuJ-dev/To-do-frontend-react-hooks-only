import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { UserContext } from "../../contexts/userContext";

const priorityOptions = ["normal", "high", "urgent"];

const EditTask = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  const { currentUser } = useContext(UserContext);

  const [taskName, setTaskName] = useState(state.title);
  const [description, setDescription] = useState(state.description);
  const [priority, setPriority] = useState(state.priority);
  const [taskNameError, setTaskNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
    const [priorityError, setPriorityError] = useState("");
    
    const DeleteTask = () => {
      fetch(`http://localhost:8080/delete-task/?id=${state._id}`, {
        method: "DELETE",
        headers: { "content-Type": "application/json" },
      }).then(res => {
          navigate('/tasks');
      });
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the email address and password.
    if (taskName.length < 1) {
      setTaskNameError("Please enter a title");
    } else if (
      priority !== "normal" &&
      priority !== "high" &&
      priority !== "urgent" &&
      priority !== "cancelled" &&
      priority !== "completed"
    ) {
      console.log(priority);
      setPriorityError("Please set a priority");
    } else if (description.length < 1) {
      setDescriptionError("Please Enter a description");
    } else {
      // Fetch the user data from an API.
      fetch(`http://localhost:8080/edit-task`, {
        method: "PUT",
        headers: { "content-Type": "application/json" },
          body: JSON.stringify({
            id: state._id,
          title: taskName,
          description: description,
          priority: priority,
          creator: currentUser,
        }),
      })
        .then((response) => response.json())
        .then((task) => {
          navigate("/tasks");
        })
        .catch((err) => console.log);
    }
  };

  // Add a function to clear the errors when the input values change.
  const handleInputChange = (e) => {
    // Get the name and value of the input element.
    const { name, value } = e.target;
    // Set the state of the corresponding input value.
    if (name === "title") {
      setTaskName(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "priority") {
      setPriority(value);
    }
    // Clear the email and password errors.
    setTaskNameError("");
    setDescriptionError("");
    setPriorityError("");
  };

  return (
    <div className="newTaskContainer">
      <div className="newTaskCard">
        <div>
          <h1>Update Task</h1>
        </div>
        {taskNameError && <p className="inputError">{taskNameError}</p>}
        {descriptionError && <p className="inputError">{descriptionError}</p>}
        {priorityError && <p className="inputError">{priorityError}</p>}
        <form className="newTaskForm" onSubmit={handleSubmit}>
          <div className="newTaskFormInputContainer">
            <input
              className="inputBox"
              type="text"
              name="title"
              placeholder="Title"
              value={taskName}
              onChange={handleInputChange}
            />

            <select
              className="inputBox"
              type="text"
              placeholder="Priority"
              name="priority"
              value={priority}
              onChange={handleInputChange}
            >
              <option value="priority" selected hidden>
                --Choose Priority--
              </option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>

            <textarea
              className="inputBox"
              type="Text"
              name="description"
              placeholder="Description"
              rows={10}
              value={description}
              onChange={handleInputChange}
            />

            <button type="submit">Update Now</button>
          </div>
        </form>
        <div className="deleteTaskButton">
          <button onClick={DeleteTask}>
                      <i className="fa fa-trash trashicon"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
