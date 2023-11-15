import AddTodosFormComp from "../components/AddTodosFormComp";
import TodoList from "../components/TodoList";
import { todosSelector } from "../redux/todosReducer";
import { useSelector } from "react-redux/es/hooks/useSelector";

const UserTodo = () => {
  const { isLoading } = useSelector(todosSelector);

  return (
    <div>
      <AddTodosFormComp />
      <div className="mx-12 divider">
        <span className="text-xl">Todo List</span>
      </div>

      {isLoading ? (
        <div className="fixed top-[50%] left-[50%] ">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <TodoList />
      )}
    </div>
  );
};

export default UserTodo;
