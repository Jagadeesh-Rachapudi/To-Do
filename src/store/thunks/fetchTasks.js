import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_CONTENT_LINK}/tasks`
  );
  return response.data;
});

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchTasks };
