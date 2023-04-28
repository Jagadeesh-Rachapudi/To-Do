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
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { store, persistor } from "./store/"; // Import store and persistor

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ListNameProvider>
    <NavigationProvider>
      <TaskPovider>
        <React.StrictMode>
          {/* Wrap your App component with PersistGate */}
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </Provider>
        </React.StrictMode>
      </TaskPovider>
    </NavigationProvider>
  </ListNameProvider>
);

reportWebVitals();
