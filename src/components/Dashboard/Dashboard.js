import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import auth from "../../firebase.config";
import Loading from "../Loading/Loading";

const Dashboard = () => {
  const userId = localStorage.getItem("user_id");
  const profileId = localStorage.getItem("profile_id");
  const userRole = localStorage.getItem("user_role");

  const location = useLocation();
  console.log(location);
  if (location.pathname === "/admin-dashboard/") {
    <Navigate to="/admin-dashboard/all-user" replace />;
  }
  const [user, userLoading] = useAuthState(auth);
  if (userLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="card w-full bg-base-100 shadow-xl my-20 p-8">
      <p className="text-2xl md:text-4xl lg:text-6xl py-8 text-center">
        Dashboard
      </p>
      <div className="divider my-4"></div>
      <div className="flex justify-center">
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="tabs">
            <NavLink to="" end className="tab md:tab-lg tab-lifted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </NavLink>
            {userRole === "admin" && (
              <NavLink to="all-user" className="tab md:tab-lg tab-lifted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </NavLink>
            )}
            {userRole === "admin" && (
              <NavLink to="all-order" className="tab md:tab-lg tab-lifted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z"
                  />
                </svg>
              </NavLink>
            )}

            {userRole === "admin" && (
              <NavLink to="add-product" className="tab md:tab-lg tab-lifted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </NavLink>
            )}
            {userRole === "user" && (
              <NavLink to="cart" className="tab md:tab-lg tab-lifted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </NavLink>
            )}
            {userRole === "user" && (
              <NavLink to="add-review" className="tab md:tab-lg tab-lifted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <div className="divider mb-8 mt-[-8px]"></div>
      {location.pathname === "/admin-dashboard/" && (
        <div className="w-full text-center py-40">
          <p className="text-6xl">Hi! {user.displayName}</p>
          <p className="text-xl mt-8">
            Welcome to Admin Dashboard. Manage Robtic.
          </p>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Dashboard;
