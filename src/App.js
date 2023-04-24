import "./App.css";
import { useEffect } from "react";
import useTasksContext from "./hooks/use-task-context";
import All from "./Pages/All";
import Route from "./utils/Route";
import Topbar from "./utils/TopBar";
import Home from "./Pages/Home";
import useListName from "./hooks/use-listName-context";

function App() {
  const { fetchTasks } = useTasksContext();
  const { fetchListNames } = useListName();
  useEffect(() => {
    fetchTasks();
    fetchListNames();
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
