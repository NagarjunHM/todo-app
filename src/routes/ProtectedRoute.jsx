import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, user }) => {
  if (!user) {
    toast.error("you are not authorized");
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
