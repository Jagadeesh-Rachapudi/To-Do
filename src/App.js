import "./App.css";
import { useEffect } from "react";
import useTasksContext from "./hooks/use-task-context";
import All from "./Pages/All";
import Route from "./utils/Route";
import Topbar from "./utils/TopBar";
import Home from "./Pages/Home";
import useListName from "./hooks/use-listName-context";
import CreateTask from "./components/CreateTask/CreateTask";
import TaskList from "./components/TaskList/TaskList";
import Task from "./components/Task/Task";
import useNavigation from "./hooks/useNavigation";

function App() {
  const { data, fetchTasks } = useTasksContext();
  const { listNames, fetchListNames } = useListName();
  const { currentPath } = useNavigation();

  useEffect(() => {
    fetchTasks();
    fetchListNames();
  }, []);

  const renderRoutes = listNames.map((listName) => {
    let renderTasks =
      listName.path === "/all"
        ? data.map(
            ({
              id,
              taskTitle,
              dueDate,
              dueTime,
              description,
              completed,
              important,
            }) => (
              <div key={id}>
                <Task
                  id={id}
                  taskTitle={taskTitle}
                  dueDate={dueDate}
                  dueTime={dueTime}
                  description={description}
                  completed={completed}
                  important={important}
                />
              </div>
            )
          )
        : data
            .filter((task) => task.listName === listName.path)
            .map(
              ({
                id,
                taskTitle,
                dueDate,
                dueTime,
                description,
                completed,
                important,
              }) => (
                <div key={id}>
                  <Task
                    id={id}
                    taskTitle={taskTitle}
                    dueDate={dueDate}
                    dueTime={dueTime}
                    description={description}
                    completed={completed}
                    important={important}
                  />
                </div>
              )
            );
                
    return (
      <Route path={listName.path}>
        <TaskList renderTasks={renderTasks} />
      </Route>
    );
  });

  return (
    <div className="App">
      <Topbar />
      <div className="col-span-5">{renderRoutes}</div>
      {currentPath === "/" ? <Home /> : null}
      {currentPath !== "/all" && currentPath !== "/" ? <CreateTask /> : null}
    </div>
  );
}

export default App;
