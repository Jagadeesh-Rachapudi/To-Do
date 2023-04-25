import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datetime/css/react-datetime.css";
import { TaskPovider } from "./context/TaskData";
import { NavigationProvider } from "./context/navigation";
import { ListNameProvider } from "./context/ListData";
import { Provider } from "react-redux";
import { store } from "./store/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ListNameProvider>
    <NavigationProvider>
      <TaskPovider>
        <React.StrictMode>
          <Provider store={store}>
            <App />
          </Provider>
        </React.StrictMode>
      </TaskPovider>
    </NavigationProvider>
  </ListNameProvider>
);

reportWebVitals();
