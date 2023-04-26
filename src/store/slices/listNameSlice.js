import { createSlice } from "@reduxjs/toolkit";
import { createListName } from "../thunks/createList";

const listNameSlice = createSlice({
  name: "listNames",
  initialState: {
    listNames: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(createListName.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createListName.fulfilled, (state, action) => {
      state.isLoading = false;
      state.listNames.push(action.payload);
    });
    builder.addCase(createListName.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const listNameReducer = listNameSlice.reducer;
