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

    const data =  await response.json();
    data.id = Math.floor(Math.random() * 1000000001);
    console.log(data);
    return data;
  }
);

// function to delete a todo
export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (payload) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${payload.id}`,
      {
        method: "DELETE",
      }
    );
    await response.json();
    return payload;
    // since the delete function does not return anything i am passing the paramater as the return value
  }
);

// function to toggle complete and inComplete
export const toggleTodo = createAsyncThunk(
  "todo/toggleTodo",
  async (payload) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${payload.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          completed: !payload.completed,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    return({completed:data.completed,
    id:payload.id});
  }
);

//function to Edit the todo title
export const todoTitleEdit = createAsyncThunk(
  "todo/titleEdit",
  async (payload) => {
    const { title, id } = payload;
    console.log(id, title);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          title: title,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    return ({title:data.title,id:id});
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
      state.user = "";
    },
  },
  extraReducers: (builder) => {
    // initialState pending
    builder.addCase(getInitialState.pending, (state) => {
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
    builder.addCase(createNewTodo.pending, (state) => {
      state.isLoading = true;
    });

    // createNewTodo fulfilled
    builder.addCase(createNewTodo.fulfilled, (state, action) => {
      state.todos = [action.payload, ...state.todos];
      state.isLoading = false;
      state.error = null;
      toast.success(action.payload.title + " Created Successfully ");
    });

    // createNewTodo rejected
    builder.addCase(createNewTodo.rejected, (state, action) => {
      toast.error("Error " + action.error.message);
      state.isLoading = false;
    });

    // deleteTodo pending
    builder.addCase(deleteTodo.pending, (state) => {
      state.isLoading = true;
    });

    // deleteTodo fulfilled
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      toast.info(action.payload.title + " Deleted Successfully ");
      let tempTodo = [...state.todos];
      tempTodo = tempTodo.filter((todo) => {
        if (todo.id !== action.payload.id) {
          return todo;
        }
      });
      state.todos = [...tempTodo];
    });

    // deleteTodo rejected
    builder.addCase(deleteTodo.rejected, (state) => {
      toast.error("Error cannot be deleted");
      state.isLoading = false;
    });

    // toggleTodo pending
    builder.addCase(toggleTodo.pending, (state) => {
      state.isLoading = true;
    });

    // toggleTodo rejected
    builder.addCase(toggleTodo.rejected, (state) => {
      toast.error("toggle not complete");
      state.isLoading = false;
    });

    // toggle todo fulfullied
    builder.addCase(toggleTodo.fulfilled, (state, action) => {
      const {completed,id} = action.payload;
      state.isLoading = false;
      let tempTodo = [...state.todos];
      tempTodo = tempTodo.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            completed: completed,
          };
        }
        return todo;
      });
      state.todos = [...tempTodo];
    });

    // todo title edit pending
    builder.addCase(todoTitleEdit.pending, (state) => {
      state.isLoading = true;
    });

    // todo title edit rejected
    builder.addCase(todoTitleEdit.rejected, (state, action) => {
      state.isLoading = false;
      toast.error(action.error.message);
    });

    // todo title edit fulfilled
    builder.addCase(todoTitleEdit.fulfilled, (state, action) => {
      state.isLoading = false;
      let tempTodo = [...state.todos];
      const {title,id} = action.payload;
      tempTodo = tempTodo.map((todo) => {
        if (todo.id == id) {
          return {
            ...todo,
            title: title,
          };
        }
        return todo;
      });
      state.todos = [...tempTodo];
      toast.success(action.payload.title + " edited successfully");
    });
  },
});

export const todosReducer = todosSlice.reducer;
export const actions = todosSlice.actions;
export const todosSelector = (state) => state.todosReducer;
