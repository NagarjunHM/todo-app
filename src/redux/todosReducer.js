import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// initial fetch function
export const getInitialState = createAsyncThunk(
  "todos/initialValueFetch",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    return response.data;
  }
);

// function to create a todo
export const createNewTodo = createAsyncThunk(
  "todo/createNewTodo", // Action type string
  async (payload) => {
    const [newTodos, user] = payload;
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: newTodos,
        body: "bar",
        userId: user,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to create a new todo (HTTP ${response.status})`);
    }
    const data = await response.json();
    return data;
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
    // initialState pending
    builder.addCase(getInitialState.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    // initialState fulfilled
    builder.addCase(getInitialState.fulfilled, (state, action) => {
      state.todos = [...action.payload];
      state.isLoading = false;
    });
    // initialState error
    builder.addCase(getInitialState.rejected, (state, action) => {
      state.error = action.error.message || "An error occured";
      state.isLoading = false;
    });

    // createNewTodo pending
    builder.addCase(createNewTodo.pending, (state, action) => {
      state.isLoading = true;
    });

    // createNewTodo fulfilled
    builder.addCase(createNewTodo.fulfilled, (state, action) => {
      state.todos = [action.payload, ...state.todos];
      state.isLoading = false;
      state.error = null;
      toast.success(action.payload.title + " Created Successful ");
    });

    // createNewTodo rejected
    builder.addCase(createNewTodo.rejected, (state, action) => {
      toast.error("Error " + action.error.message);
      state.isLoading = false;
    });
  },
});

export const todosReducer = todosSlice.reducer;
export const actions = todosSlice.actions;
export const todosSelector = (state) => state.todosReducer;
