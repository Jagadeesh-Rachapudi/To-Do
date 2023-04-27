import { createSlice } from "@reduxjs/toolkit";
import { addUser } from "../thunks/createUser";

const userSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clients.push(action.payload);
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

//clents.user

export const userReducer = userSlice.reducer;
