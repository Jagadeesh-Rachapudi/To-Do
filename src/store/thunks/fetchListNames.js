import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchListNames = createAsyncThunk("listNames/fetch", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_CONTENT_LINK}/listNames`
  );
  return response.data;
});

export { fetchListNames };
