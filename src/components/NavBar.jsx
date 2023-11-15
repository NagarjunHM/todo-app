import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../redux/todosReducer";
import { getInitialState } from "../redux/todosReducer";
import { Outlet } from "react-router-dom";
import { todosSelector } from "../redux/todosReducer";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(todosSelector);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getInitialState());
  }, []);

  return (
    <div>
      <div className="fixed top-0 z-10 w-full h-16 shadow navbar bg-base-200/5 backdrop-blur-xl">
        <div className="flex-1 mx-3 text-2xl font-semibold tracking-wider text-neutral-content">
          Todo App
        </div>
        <div className="flex-none">
          <div className="gap-x-2 menu menu-horizontal">
            {user ? (
              <>
                <button className="btn badge no-animation btn-sm">
                  User : {user}
                </button>
                <button
                  onClick={() => {
                    dispatch(actions.resetSelectedUser(""));
                    navigate("/");
                  }}
                  className="btn btn-warning btn-sm"
                >
                  Log Out
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;
