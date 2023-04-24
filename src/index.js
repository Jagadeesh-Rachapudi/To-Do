import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datetime/css/react-datetime.css";
import { Provider } from "./context/TaskData";
import { NavigationProvider } from "./context/navigation";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NavigationProvider>
    <Provider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </NavigationProvider>
);

reportWebVitals();

// import "./index.css";
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { Provider } from "./context/TaskData";

// const el = document.getElementById("root");
// const root = ReactDOM.createRoot(el);

// root.render(
//   // <Provider>
//     <App />
//   // </Provider>
// );
