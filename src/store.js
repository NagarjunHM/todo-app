import { configureStore } from "@reduxjs/toolkit";
import { todosReducer } from "./redux/todosReducer";

export const store = configureStore({
  reducer: {
    todosReducer,
  },
});
