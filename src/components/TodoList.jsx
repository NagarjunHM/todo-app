import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { todosSelector } from "../redux/todosReducer";
import { FiEdit2 } from "react-icons/fi";
import { BsSave2 } from "react-icons/bs";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { deleteTodo, toggleTodo, todoTitleEdit } from "../redux/todosReducer";
import { toast } from "react-toastify";

const TodoList = () => {
  const { todos, user } = useSelector(todosSelector);
  const dispatch = useDispatch();
  // filter method to fetch the details of only logged in user
  const currentUserTodos = todos.filter((todo) => {
    if (todo.userId === user) {
      return todo;
    }
  });
  // console.log(currentUserTodos);
  const [editToggledTodo, setEditToggledTodo] = useState(null);
  const [todoTextArea, setTodoTextArea] = useState("");

  // setting the id and value for the text area
  const handleTodoEditVisibility = (todo) => {
    setEditToggledTodo(todo.id);
    setTodoTextArea(todo.title);
  };

  // function handling the delete todo
  const handleDeleteTodo = (todo) => {
    dispatch(deleteTodo(todo));
  };

  //function to handle toggle complete and incomplete todo
  const handleToggleTodo = (todo) => {
    dispatch(toggleTodo(todo));
  };

  //function to handle todo title change
  const handleTodoTitleChange = (todo) => {
    if (!todoTextArea) {
      toast.error("Todo cannot be empty");
      return;
    }
    dispatch(todoTitleEdit({ title: todoTextArea, id: todo.id }));
  };

  return (
    <div className="flex flex-wrap justify-center w-full gap-10 my-10">
      {/* card start here */}

      {currentUserTodos.map((todo) => (
        <div
          className={`card w-96 h-48 flex-shrink-0 card-bordered bg-base-200 card-compact p-1 ${
            editToggledTodo !== todo.id
              ? ""
              : "scale-[1.05] z-50 duration-200 transition-all outline outline-offset-4"
          }`}
          key={todo.id}
        >
          <div className="flex flex-col card-body">
            <div className="card-title">
              {/* added flex-grow to make sure button stick to the bottom of the card*/}
              <div className="flex flex-grow cursor-pointer">
                {todo.completed ? (
                  <div className="tooltip " data-tip="Make it In-Complete">
                    <div
                      className="my-2 badge badge-accent "
                      onClick={() => {
                        handleToggleTodo(todo);
                      }}
                    >
                      Completed
                    </div>
                  </div>
                ) : (
                  <div className="tooltip " data-tip="Make it Complete">
                    <div
                      className="my-2 badge badge-error badge-outline"
                      onClick={() => {
                        handleToggleTodo(todo);
                      }}
                    >
                      In-Complete
                    </div>
                  </div>
                )}
              </div>
            </div>
            <hr className="my-2" />

            {/* conditonally rendering the input area or todo value */}
            {editToggledTodo === todo.id ? (
              <div className="flex items-center">
                <form className="flex flex-grow">
                  <textarea
                    className="w-[220px] h-[75px] textarea textarea-neutral"
                    onChange={(e) => {
                      setTodoTextArea(e.target.value);
                    }}
                    value={todoTextArea}
                  ></textarea>
                </form>
                <div className="flex gap-x-4">
                  <div className="tooltip tooltip-top" data-tip="Save">
                    <button
                      className="btn btn-circle btn-sm btn-primary"
                      onClick={() => {
                        handleTodoTitleChange(todo);
                      }}
                    >
                      <BsSave2 size="1.2em" />
                    </button>
                  </div>
                  <div className="tooltip tooltip-top" data-tip="Close">
                    <button
                      className="right-0 flex mr-0 btn btn-circle btn-sm btn-outline"
                      onClick={() => {
                        setEditToggledTodo(null);
                      }}
                    >
                      <AiOutlineClose size="1.2em" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-row justify-between flex-grow-0">
                {/* todo title */}
                <div>
                  <h2 className="flex flex-row flex-grow">{todo.title}</h2>
                </div>

                {/* edit and delete buttons */}
                <div className="flex flex-col gap-y-2">
                  {/* edit button */}
                  <div className="tooltip tooltip-right" data-tip="Edit">
                    <button
                      className="right-0 flex mr-0 btn btn-circle btn-sm btn-outline"
                      onClick={() => {
                        handleTodoEditVisibility(todo);
                      }}
                    >
                      <FiEdit2 size="1.2em" />
                    </button>
                  </div>
                  {/* delete button */}
                  <div className="tooltip tooltip-right " data-tip="Delete">
                    <button
                      className="btn btn-circle btn-sm btn-error btn-outline"
                      onClick={() => {
                        handleDeleteTodo(todo);
                      }}
                    >
                      <AiOutlineDelete size="1.3em" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
