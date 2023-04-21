import logo from "./logo.svg";
import "./App.css";
import Task from "./components/Task/Task";
import TaskList from "./components/TaskList/TaskList";
import Notification from "./components/Notification/Notification";
import CreateTask from "./components/CreateTask/CreateTask";
import { useEffect } from "react";

import useTasksContext from "./hooks/use-task-context";
function App() {
  const { fetchTasks } = useTasksContext();
  useEffect(() => {
    fetchTasks();
  });
  return (
    <div className="App">
      {/* <CreateTask /> */}
      <TaskList />
    </div>
  );
}

export default App;
