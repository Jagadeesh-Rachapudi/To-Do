import "./App.scss";
import { useEffect, useState } from "react";
import Route from "./utils/Route";
import Topbar from "./utils/TopBar";
import Home from "./Pages/Home";
import CreateTask from "./components/CreateTask/CreateTask";
import TaskList from "./components/TaskList/TaskList";
import Task from "./components/Task/Task";
import useNavigation from "./hooks/useNavigation";
import { fetchTasks } from "./store";
import { useSelector } from "react-redux";
import { useThunk } from "./hooks/use-thunk";
import TaskSkeleton from "./components/Task/TaskSkeleton";
import { fetchListNames } from "./store";

function App() {
  const { currentPath } = useNavigation();
  const [doFetchTasks, isLoading, error] = useThunk(fetchTasks);
  const [doFetchListNames] = useThunk(fetchListNames);
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const { data } = useSelector((state) => {
    return {
      data: state.tasks,
    };
  });

  const { listNamesData } = useSelector((state) => {
    return {
      listNamesData: state.listNames.listNamesData,
    };
  });

  useEffect(() => {
    doFetchTasks();
    doFetchListNames();
  }, [doFetchTasks, doFetchListNames]);

  const renderRoutes = listNamesData.map((listName) => {
    let renderTasks =
      listName.id === 8
        ? data.data.map(
            ({
              id,
              taskTitle,
              dueDate,
              dueTime,
              description,
              completed,
              important,
              listID,
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
                  listID={listID}
                />
              </div>
            )
          )
        : data.data
            .filter((task) => task.listID === listName.id)
            .map(
              ({
                id,
                taskTitle,
                dueDate,
                dueTime,
                description,
                completed,
                important,
                listID,
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
                    listID={listID}
                  />
                </div>
              )
            );

    console.log(renderTasks);
    {
      return (
        <Route path={listName.path}>
          {renderTasks.length > 0 ? (
            <TaskList renderTasks={renderTasks} />
          ) : (
            currentPath !== "/" && (
              <div>
                <div className="intro">
                  <h1>No tasks yet !!!</h1>
                  <p>Click on plus button below to create a task</p>
                </div>
              </div>
            )
          )}
        </Route>
      );
    }
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
