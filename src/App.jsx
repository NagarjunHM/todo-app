import SelectUserPage from "./pages/SelectUserPage";
import NavBar from "./components/NavBar";
import UserTodo from "./pages/UserTodo";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { todosSelector } from "./redux/todosReducer";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/ProtectedRoute";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = useSelector(todosSelector);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <NavBar />
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
        </div>
      ),
      children: [
        { index: true, element: <SelectUserPage /> },
        {
          path: "UserTodo",
          element: (
            <ProtectedRoute user={user}>
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
