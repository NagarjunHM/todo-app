import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { todosReducer, todosSelector } from "../redux/todosReducer";

const AddTodosFormComp = () => {
  // onClick function to handle create todo
  const handleCreateTodo = () => {};
  const { todos, user } = useSelector(todosSelector);
  console.log(user);
  return (
    <div className="flex justify-center w-full my-10">
      <form
        className="flex justify-center w-4/5 gap-x-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateTodo();
        }}
      >
        <input
          type="text"
          placeholder="Type here"
          className="w-2/3 input input-bordered input-primary"
        />
        <button className="btn btn-primary">Create Todo</button>
      </form>
    </div>
  );
};

export default AddTodosFormComp;
