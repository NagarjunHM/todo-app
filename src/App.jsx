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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <ToastContainer
            position="top-right"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="colored"
          />
          <NavBar />
        </div>
      ),
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

  if (user === null) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};
