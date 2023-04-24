import React from "react";
import TaskList from "../components/TaskList/TaskList.js";
import CreateTask from "../components/CreateTask/CreateTask.js";

function All() {
  return (
    <div>
      <TaskList />
      <CreateTask />
    </div>
  );
}

export default All;
