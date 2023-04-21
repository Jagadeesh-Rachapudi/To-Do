import { useContext } from "react";
import TaskContext from "../context/TaskData";

function useTasksContext() {
  return useContext(TaskContext);
}

export default useTasksContext;
