import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { TaskContext } from "../context/TaskProvider";

const Msg = styled.p`
  color: blue;
  font-size: 22px;
`;

const CreateTask = () => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [subtasks, setSubtasks] = useState([{ name: "", completed: false }]);
  const { tasks, setTasks } = useContext(TaskContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAdd = () => {
    setSubtasks([...subtasks, { name: "", completed: false }]);
  };

  const handleChange = (event, index) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].name = event.target.value;
    setSubtasks(newSubtasks);
  };

  const handleRemove = (index) => {
    const newSubtasks = [...subtasks];
    newSubtasks.splice(index, 1);
    setSubtasks(newSubtasks);
  };

  const handleSubmit = () => {
    const newTask = {};
    newTask.id = uuid();
    newTask.name = taskName;
    newTask.percentCompleted = 0
    newTask.subtasks = [...subtasks];
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    localStorage.setItem("crud-24-tasks", JSON.stringify(newTasks));
    setIsUpdating(true);
    setTimeout(() => {
      navigate("/readtasks");
      setIsUpdating(false);
    }, 2000);
  };

  const handleClick = (index) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index].completed = !newSubtasks[index].completed;
    setSubtasks(newSubtasks);
  };

  return (
    <div>
      <Link to={`/readtasks`}>Back</Link>
      <h4>CreateTask</h4>
      <div className="form">
        <input
          type="text"
          placeholder="Task"
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
        />
        {subtasks.map((subtask, index) => {
          return (
            <div key={index} className="sub-task">
              <input
                type="text"
                placeholder="Subtask"
                value={subtask.name}
                onChange={(event) => handleChange(event, index)}
              />
              <button onClick={() => handleRemove(index)}>Remove</button>
            </div>
          );
        })}
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {tasks?.map((task) => {
        return (
          <div key={task.id} className="box">
            <h4>{task.name}</h4>
            {task.subtasks.map((subtask, index) => {
              return (
                <p
                  key={index}
                  onClick={() => handleClick(index)}
                  style={{
                    textDecoration: subtask.completed ? "line-through" : "none",
                  }}
                >
                  {subtask.name}
                </p>
              );
            })}
          </div>
        );
      })}
      {isUpdating && <Msg>Updating...</Msg>}
    </div>
  );
};

export default CreateTask;
