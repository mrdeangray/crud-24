import React, { createContext, useEffect, useState } from "react";

export const TaskContext = createContext(null);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("crud-24-tasks")) || [];
    setTasks(savedTasks);
  }, []);

  return <TaskContext.Provider>{children}</TaskContext.Provider>;
};

export default TaskProvider;
