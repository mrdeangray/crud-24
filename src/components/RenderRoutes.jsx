import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PrivateRoutes from "./PrivateRoutes";
import CreateTask from "./CreateTask";
import ReadTasks from "./ReadTasks";
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";

const RenderRoutes = ({ className }) => {
  return (
    <Routes className={className}>
      <Route element={<PrivateRoutes />}>
        <Route exact path="/createtask" element={<CreateTask />} />
        <Route exact path="/readtasks" element={<ReadTasks />} />
        <Route exact path="/updatetask" element={<UpdateTask />} />
        <Route exact path="/deletetask" element={<DeleteTask />} />
      </Route>
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
};

export default RenderRoutes;
