import React from "react";
import AddTodosFormComp from "../components/AddTodosFormComp";
import TodoList from "../components/TodoList";

const UserTodo = () => {
  return (
    <div>
      <AddTodosFormComp />
      <div className="mx-12 divider">
        <span className="text-xl">Todo List</span>
      </div>
      <TodoList />
    </div>
  );
};

export default UserTodo;
