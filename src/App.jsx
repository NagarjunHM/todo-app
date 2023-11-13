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
  // console.log("ProtectedRoute rendering");
  if (user === null) {
    // toast.error("you are not authorized");

    return (
      <div>
        <Navigate to="/" replace={true} />
      </div>
    );
  }

  return children;
};
