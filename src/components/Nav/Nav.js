import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink } from "react-router-dom";
import auth from "../../firebase.config";
import useFirebase from "../../hooks/useFirebase";

const Nav = () => {
  const [user] = useAuthState(auth);
  const { logOut } = useFirebase();
  return (
    <>
      <input id="nav-menu" type="checkbox" className="drawer-toggle" />
      <div className="navbar bg-base-100 my-4">
        <div className="flex-1 lg:navbar-start sm:navbar-center">
          <Link to="/">
            <img src="https://i.ibb.co/pLY4183/logo.png" alt="" />
          </Link>
        </div>
        <div className="sm:block lg:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/all-product">All Product</NavLink>
              </li>
              {user && (
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
              )}
              {!user && (
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              )}
              {!user && (
                <li>
                  <NavLink to="/login">LogIn</NavLink>
                </li>
              )}
              {user && (
                <li>
                  <button className="btn btn-error" onClick={() => logOut()}>
                    Log Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex-none hidden lg:block">
          <ul className="menu menu-horizontal p-0 gap-x-4">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/all-product">All Product</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}
            {!user && (
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            )}
            {!user && (
              <li>
                <NavLink to="/login">LogIn</NavLink>
              </li>
            )}
            {user && (
              <li>
                <button className="btn btn-error" onClick={() => logOut()}>
                  Log Out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;
