import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { TaskContext } from "../context/TaskProvider";

const Msg = styled.p`
  color: blue;
  font-size: 22px;
`;

const UpdateTask = () => {
  const { id } = useParams();
  const { tasks, setTasks } = useContext(TaskContext);
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [subtasks, setSubtasks] = useState([{ name: "", completed: false }]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currTask, setCurrTask] = useState({});
  const [percentCompleted, setPercentCompleted] = useState(0);

  useEffect(() => {
    const curr = tasks.find((task) => task.id === id);
    setTaskName(curr.name);
    setSubtasks(curr.subtasks);
    setPercentCompleted(curr.percentCompleted);
    setCurrTask(curr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = () => {
    const newSubtasks = [...subtasks, { name: "", completed: false }];
    setSubtasks(newSubtasks);
    const percent = Math.round(
      (newSubtasks.filter((s) => s.completed).length / newSubtasks.length) * 100
    );
    setPercentCompleted(percent);
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
    const percent = Math.round(
      (newSubtasks.filter((s) => s.completed).length / newSubtasks.length) * 100
    );
    setPercentCompleted(percent);
  };

  const handleSubmit = () => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.name = taskName;
        task.percentCompleted = percentCompleted;
        task.subtasks = [...subtasks];
      }
      return task;
    });
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
      <h4>UpdateTask: {currTask.name}</h4>
      <div className="form">
        <input
          type="text"
          placeholder="Task"
          onChange={(e) => setTaskName(e.target.value)}
          value={taskName}
        />
        <h3>{percentCompleted}%</h3>
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

export default UpdateTask;
