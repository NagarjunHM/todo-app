import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewTodo } from "../redux/todosReducer";
import { toast } from "react-toastify";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { todosSelector } from "../redux/todosReducer";

const AddTodosFormComp = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(todosSelector);
  const [newTodo, setNewTodo] = useState("");

  // onClick function to handle create todo
  const handleCreateTodo = () => {
    if (!newTodo) {
      toast.error("Empty todo cannot be created");
      return;
    }

    // dispatching the user and newtodo message
    dispatch(createNewTodo([newTodo, user]));
    setNewTodo("");
  };

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
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
        />
        <button className="btn btn-primary">Create Todo</button>
      </form>
    </div>
  );
};

export default AddTodosFormComp;
