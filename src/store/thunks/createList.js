import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createListName = createAsyncThunk(
  "listNames/add",
  async ({ label, path }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_CONTENT_LINK}/listNames`,
      {
        label,
        path,
      }
    );

    return response.data;
  }
);

export { createListName };
