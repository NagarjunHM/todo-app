import React from "react";
import { todosSelector } from "../redux/todosReducer";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../redux/todosReducer";
import { useNavigate } from "react-router-dom";

const AllUsersComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todos } = useSelector(todosSelector);

  //reduce function to retreive all unique users from todos
  let allUsers = todos.reduce((acc, cur) => {
    if (!acc.includes(cur.userId)) {
      acc.push(cur.userId);
    }
    return acc;
  }, []);

  // function to handle user navigation
  const handleUserSelection = (user) => {
    dispatch(actions.userSelected(user));
    navigate("/usertodo");
  };

  return (
    <div>
      <div className="fixed flex flex-col items-center w-full top-28">
        {/* alert */}
        <div>
          <div className="my-5 alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 stroke-current shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Select the User whose todos you want to access.</span>
          </div>
        </div>

        {/* mapping through all user id's */}
        <ul className="w-56 menu-vertical menu bg-base-200 rounded-box">
          {allUsers.map((user) => (
            <li
              key={user}
              onClick={() => {
                handleUserSelection(user);
              }}
            >
              <div className="flex">
                <div className="avatar placeholder">
                  <div className="w-8 rounded-full bg-neutral text-neutral-content">
                    <span className="text-base">{user}</span>
                  </div>
                </div>
                <a className="text-lg">User : {user}</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllUsersComp;
