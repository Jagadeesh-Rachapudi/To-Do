import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
});

export const taskReducer = taskSlice.reducer;
