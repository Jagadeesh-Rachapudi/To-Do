import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addTask = createAsyncThunk(
  "tasks/add",
  async ({ taskTitle, dueDate, dueTime, description, important, listID }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_CONTENT_LINK}/tasks`,
      {
        taskTitle,
        dueDate,
        dueTime,
        description,
        completed: false,
        important,
        listID: listID,
      }
    );
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
