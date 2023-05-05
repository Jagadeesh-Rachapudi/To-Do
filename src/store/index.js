import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { taskReducer } from "./slices/taskSlice";
import { listNameReducer } from "./slices/listNameSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    listNames: listNameReducer,
    tasks: taskReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default { store, persistor };

export * from "./thunks/fetchTasks";
export * from "./thunks/createTask";
export * from "./thunks/editTask";
export * from "./thunks/deleteTask";
export * from "./thunks/fetchListNames";
