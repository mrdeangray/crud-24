import React, { useContext } from "react";
import { TaskContext } from "../context/TaskProvider";
import { Link } from "react-router-dom";

const Task = ({ task, className }) => {
  const { tasks, setTasks } = useContext(TaskContext);

  const handleClick = (index) => {
    const newSubtasks = [...task.subtasks];
    newSubtasks[index].completed = !newSubtasks[index].completed;
    const percentCompleted = Math.round(
      (newSubtasks.filter((s) => s.completed).length / newSubtasks.length) * 100
    );

    console.log(percentCompleted);
    const newTasks = tasks.map((tk) => {
      if (tk.id === task.id) {
        tk.percentCompleted = percentCompleted;
        tk.subtasks = newSubtasks;
      }
      return tk;
    });

    setTasks(newTasks);
    localStorage.setItem("crud-24-tasks", JSON.stringify(newTasks));
  };

  return (
    <div className={className}>
      <h2>{task.name}</h2>
      <h4>{task.percentCompleted}%</h4>
      {task.subtasks.map((subtask, index) => {
        return (
          <p
            onClick={() => handleClick(index)}
            key={index}
            style={{
              textDecoration: subtask.completed ? "line-through" : "none",
            }}
          >
            {subtask.name}
          </p>
        );
      })}
      <Link to={`/updatetask/${task.id}`}>
        <button>Update</button>
      </Link>
      <Link to={`/deletetask/${task.id}`}>
        <button>Delete</button>
      </Link>
    </div>
  );
};

export default Task;
