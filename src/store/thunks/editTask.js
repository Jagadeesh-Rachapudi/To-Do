import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const editTaskbyId = createAsyncThunk(
  "tasks/update",
  async ({ id, updatedTask }) => {
    const response = await axios.put(
      `${process.env.REACT_APP_CONTENT_LINK}/${id}`,
      {
        ...updatedTask,
      }
    );

    await pause(400);

    return response.data;
  }
);

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { editTaskbyId };
