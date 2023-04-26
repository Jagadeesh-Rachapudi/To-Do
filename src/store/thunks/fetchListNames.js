import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchListNames = createAsyncThunk("listNames/fetch", async () => {
  const response = await axios.get("http://localhost:3001/listNames");

  return response.data;
});

export { fetchListNames };