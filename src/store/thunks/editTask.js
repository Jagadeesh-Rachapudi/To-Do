import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const editTaskbyId = createAsyncThunk(
  "tasks/update",
  async ({ id, updatedTask }) => {
    const response = await axios.put(
      `${process.env.REACT_APP_CONTENT_LINK}/tasks/${id}`,
      {
        ...updatedTask,
      }
    );
    return response.data;
  }
);

export { editTaskbyId };
