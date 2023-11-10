import SelectUserPage from "./pages/SelectUserPage";
import NavBar from "./components/NavBar";
import UserTodo from "./pages/UserTodo";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { todosSelector } from "./redux/todosReducer";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        { index: true, element: <SelectUserPage /> },
        {
          path: "UserTodo",
          element: (
            <ProtectedRoute>
              <UserTodo />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector(todosSelector);
  console.log(user);
  if (user === null) return <Navigate to="/" replace={true} />;
  return children;
};
