import "./App.css";
import { useEffect } from "react";
import Route from "./utils/Route";
import Topbar from "./utils/TopBar";
import Home from "./Pages/Home";
import useListName from "./hooks/use-listName-context";
import CreateTask from "./components/CreateTask/CreateTask";
import TaskList from "./components/TaskList/TaskList";
import Task from "./components/Task/Task";
import useNavigation from "./hooks/useNavigation";
import { fetchTasks } from "./store";
import { useSelector } from "react-redux";
import { useThunk } from "./hooks/use-thunk";
import { fetchListNames } from "./store";
import TaskSkeleton from "./components/Task/TaskSkeleton";

function App() {
  const { currentPath } = useNavigation();
  const [doFetchTasks, isLoading, error] = useThunk(fetchTasks);
  const [doFetchListNames] = useThunk(fetchListNames);

  const { data, listNamesData } = useSelector((state) => {
    return {
      data: state.tasks,
      listNamesData: state.listNames.listNamesData,
    };
  });

  useEffect(() => {
    doFetchTasks();
    doFetchListNames();
  }, [doFetchTasks]);

  const renderRoutes = listNamesData.map((listName) => {
    let renderTasks =
      listName.path === "/all"
        ? data.data.map(
            ({
              id,
              taskTitle,
              dueDate,
              dueTime,
              description,
              completed,
              important,
              listName,
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
                  listName={listName}
                />
              </div>
            )
          )
        : data.data
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
                listName,
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
                    listName={listName}
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

  let content = <></>;

  if (isLoading) {
    content = (
      <div className="d-flex justify-content-center align-items-center w-75 m-auto pt-5 flex-wrap">
        <TaskSkeleton times={12} />
      </div>
    );
  } else if (error) {
    content = <div> {console.log(error)} Error</div>;
  } else {
    content = <div className="col-span-5">{renderRoutes}</div>;
  }

  return (
    <div className="App">
      <Topbar />
      {content}
      {currentPath === "/" ? <Home /> : null}
      {currentPath !== "/all" && currentPath !== "/" ? <CreateTask /> : null}
    </div>
  );
}

export default App;
