import logo from "./logo.svg";
import "./App.css";
import Task from "./components/Task/Task";
import TaskList from "./components/TaskList/TaskList";
import Notification from "./components/Notification/Notification";
import CreateTask from "./components/CreateTask/CreateTask";
import { useEffect } from "react";
import { useState } from "react";

import useTasksContext from "./hooks/use-task-context";
import DateTimeMatcher from "./utils/DateTimeMatcher";
function App() {
  const { fetchTasks } = useTasksContext();
  useEffect(() => {
    fetchTasks();
  }, []);

  // const [dueDate, setDueDate] = useState("22/04/2023");
  // const [dueTime, setDueTime] = useState("09:37");
  // console.log(DateTimeMatcher({ dueDate, dueTime }));
  return (
    <div className="App">
      {/* <CreateTask /> */}
      <TaskList />
      {/* <DateFormater /> */}
    </div>
  );
}

export default App;
