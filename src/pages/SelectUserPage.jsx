import React from "react";
import AllUsersComp from "../components/AllUsersComp";
import { todosSelector } from "../redux/todosReducer";
import { useSelector } from "react-redux";

const SelectUserPage = () => {
  const { isLoading, error } = useSelector(todosSelector);

  if (isLoading) {
    return (
      <div className="w-full h-[90vh] flex flex-row items-center justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[90vh] flex flex-row items-center justify-center">
        <div className="text-3xl text-error">{error} !!!</div>
      </div>
    );
  }
  return (
    <div>
      <AllUsersComp />
    </div>
  );
};

export default SelectUserPage;
