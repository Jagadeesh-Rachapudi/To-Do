import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("tasks/fetch", async () => {
  const response = await axios.get("http://localhost:3001/users");

  return response.data;
});

export { fetchUsers };
