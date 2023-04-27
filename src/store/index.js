import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from "./slices/taskSlice";
import { listNameReducer } from "./slices/listNameSlice";
import { userReducer } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    listNames: listNameReducer,
    tasks: taskReducer,
    users: userReducer,
  },
});

export * from "./thunks/fetchTasks";
export * from "./thunks/createTask";
export * from "./thunks/editTask";
export * from "./thunks/deleteTask";
export * from "./thunks/createList";
export * from "./thunks/fetchListNames";
export * from "./thunks/createUser";
