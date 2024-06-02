import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../context/TaskProvider";
import Task from "./Task";

const ReadTasks = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div>
      <Link to={`/`}>Back</Link>
      <h4>ReadTasks</h4>

      {tasks.map((task) => {
        return <Task className="box" key={task.id} task={task} />;
      })}
      <Link to={`/createtask`}>
        <button>Create Task</button>
      </Link>
    </div>
  );
};

export default ReadTasks;
