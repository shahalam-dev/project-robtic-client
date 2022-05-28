import React from "react";
import Forbidden from "../Forbidden/Forbidden";

const RequireAdmin = ({ children }) => {
  const userRole = localStorage.getItem("user_role");
  if (userRole === "" || userRole === "user") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default RequireAdmin;
