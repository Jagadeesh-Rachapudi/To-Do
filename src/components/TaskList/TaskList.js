import React from "react";
import Task from "../Task/Task";
import "./TaskList.scss";
import useTasksContext from "../../hooks/use-task-context";

function TaskList({ renderTasks }) {
  const { tasks, editTaskbyId } = useTasksContext();
  return <div className="taskList">{renderTasks}</div>;
}

export default TaskList;
