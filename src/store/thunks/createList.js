import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createListName = createAsyncThunk(
  "listNames/add",
  async ({ label, path }) => {
    const response = await axios.post("http://localhost:3001/listNames", {
      label,
      path,
    });

    return response.data;
  }
);

export { createListName };
