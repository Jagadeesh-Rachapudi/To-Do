import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  await axios.delete(`${process.env.REACT_APP_CONTENT_LINK}/tasks/${id}`);

  await pause(400);

  return id;
});

export { deleteTask };

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
