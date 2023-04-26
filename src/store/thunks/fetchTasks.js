import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const response = await axios.get("http://localhost:3001/tasks");

  // DEV ONLY!!!
  // await pause(1000);

  return response.data;
});

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchTasks };
