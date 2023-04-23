import "./App.css";
import TaskList from "./components/TaskList/TaskList";
import CreateTask from "./components/CreateTask/CreateTask";
import { useEffect, useState } from "react";
import useTasksContext from "./hooks/use-task-context";
import TimePicker from "react-time-picker";
// import Test from "./Test";

function App() {
  const [time, setTime] = useState("12:00");
  const handleTimeChange = (value) => {
    setTime(value);
  };
  const { fetchTasks } = useTasksContext();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <TaskList />
      <CreateTask />
    </div>
  );
}

export default App;
