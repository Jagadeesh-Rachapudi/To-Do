import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("tasks/fetch", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_CONTENT_LINK}/users`
  );
  return response.data;
});

export { fetchUsers };
