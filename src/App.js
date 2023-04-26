import "./App.scss";
import { useEffect, useState } from "react";
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
import Flippy, { FrontSide, BackSide } from "react-flippy";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

function App() {
  const { currentPath } = useNavigation();
  const [doFetchTasks, isLoading, error] = useThunk(fetchTasks);
  const [doFetchListNames] = useThunk(fetchListNames);
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const { data, listNamesData } = useSelector((state) => {
    return {
      data: state.tasks,
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
      {currentPath === "/home" ? <Home /> : null}
      {currentPath !== "/all" && currentPath !== "/" ? <CreateTask /> : null}

      {currentPath === "/" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "92vh",
          }}
        >
          <Flippy
            flipOnClick={false}
            isFlipped={isFlipped}
            flipDirection="horizontal"
            className="flippy-box rounded"
          >
            <FrontSide>
              <Login />
              <p
                className="text-right me-3 cursor-pointer signup-link hover:text-blue-500"
                onClick={flipCard}
              >
                Sign up
              </p>
            </FrontSide>
            <BackSide>
              <SignUp />
              <p
                className="text-right me-3 cursor-pointer signup-link hover:text-blue-500"
                onClick={flipCard}
              >
                Login
              </p>
            </BackSide>
          </Flippy>
        </div>
      ) : null}
    </div>
  );
}

export default App;
