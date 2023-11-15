import { Fragment, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import { UserContext } from "../../contexts/userContext";

import "./Navigation.css";



const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  // console.log(currentUser);

  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  const signOutHandler = () => {
    setCurrentUser(null);
    navigate("/login");
    // console.log(currentUser);
  };

  return (
    <Fragment>
      <div className="navigationContainer">
        <div className="logoContainer">
          <Link to="/">
            <img src="./logo512.png" alt="not yet" height="50px" />
          </Link>
        </div>
        <div className="navLinkContainer">
          {currentUser ? (
            <div>
              <Link className="navlink pageLinks" to="/new-task">
                New Task
              </Link>
              <Link className="navlink pageLinks" to="/tasks">
                Your Tasks
              </Link>
              <button
                className="navlink signOutButton"
                onClick={signOutHandler}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="loggedOutPageLinks">
              <Link className="navlink pageLinks" to="/login">
                Login
              </Link>
              <Link className="navlink pageLinks" to="/signup">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="outletRenderWindow">
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Navigation;
