import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addUser = createAsyncThunk(
  "clients/add",
  async ({ email, name, pswd }) => {
    console.log("Email", name);
    const response = await axios.post("http://localhost:3001/users", {
      email,
      name,
      pswd,
    });
    return response.data;
  }
);

export { addUser };
