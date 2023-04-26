import { createSlice } from "@reduxjs/toolkit";
import { fetchListNames } from "../thunks/fetchListNames";

const listNameSlice = createSlice({
  name: "listNames",
  initialState: {
    listNamesData: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchListNames.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchListNames.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listNamesData = action.payload;
    });
    builder.addCase(fetchListNames.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const listNameReducer = listNameSlice.reducer;
