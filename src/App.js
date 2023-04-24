import "./App.css";
import { useEffect } from "react";
import useTasksContext from "./hooks/use-task-context";
import All from "./Pages/All";
import Link from "./utils/Link";
import Route from "./utils/Route";
import Topbar from "./utils/TopBar";
import Home from "./Pages/Home";

function App() {
  const { fetchTasks } = useTasksContext();
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="App">
      <Topbar />
      <div className="col-span-5">
        <Route path="/all">
          <All />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </div>
    </div>
  );
}

export default App;
