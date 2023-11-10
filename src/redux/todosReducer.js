import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getInitialState = createAsyncThunk(
  "todos/initialValueFetch",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    return response.data;
  }
);

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
  user: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // function to assign the selected user
    userSelected: (state, action) => {
      state.user = action.payload;
    },

    // function to reset the selected user
    resetSelectedUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // pending initialState
    builder.addCase(getInitialState.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    }),
      // fulfilled initialState
      builder.addCase(getInitialState.fulfilled, (state, action) => {
        state.todos = [...action.payload];
        state.isLoading = false;
      });
    // error initialState
    builder.addCase(getInitialState.rejected, (state, action) => {
      state.error = action.error.message || "An error occured";
      state.isLoading = false;
    });
  },
});

export const todosReducer = todosSlice.reducer;
export const actions = todosSlice.actions;
export const todosSelector = (state) => state.todosReducer;
