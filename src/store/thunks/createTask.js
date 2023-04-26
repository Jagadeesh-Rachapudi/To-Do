import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addTask = createAsyncThunk(
  "tasks/add",
  async ({ taskTitle, dueDate, dueTime, description, important, listName }) => {
    const response = await axios.post("http://localhost:3001/tasks", {
      taskTitle,
      dueDate,
      dueTime,
      description,
      completed: false,
      important,
      listName,
    });

    return response.data;
  }
);

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { addTask };
