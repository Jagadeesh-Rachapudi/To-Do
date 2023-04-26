import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "../thunks/fetchTasks";
import { addTask } from "../thunks/createTask";
import { editTaskbyId } from "../thunks/editTask";
import { deleteTask } from "../thunks/deleteTask";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {

    builder.addCase(fetchTasks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //ADD TASK

    builder.addCase(addTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //EDIT TASK

    builder.addCase(editTaskbyId.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editTaskbyId.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedTask = action.payload;
      const updatedIndex = state.data.findIndex(
        (task) => task.id === updatedTask.id
      );
      if (updatedIndex !== -1) {
        state.data[updatedIndex] = updatedTask;
      }
    });
    builder.addCase(editTaskbyId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    //DELETE TASK

    builder.addCase(deleteTask.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter((task) => task.id !== action.payload);
    });

    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const taskReducer = taskSlice.reducer;
