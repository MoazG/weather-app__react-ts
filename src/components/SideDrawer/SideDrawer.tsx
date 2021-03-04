import React from "react";

import Backdrop from "../Ui/Backdrop/Backdrop";

import userIcon from "../../assets/svg/user.svg";
import "./SideDrawer.scss";
import { usePref } from "../../context/UserPrefProvider";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";

type Props = {
  show: boolean;
  showHandler: (show: boolean) => void;
};
const SideDrawer = ({ show, showHandler }: Props) => {
  const { theme, userDetails } = usePref();

  return (
    <>
      <Backdrop show={show} showHandler={showHandler} />
      <div
        className={`side-drawer ${show ? "open" : "closed"} ${
          theme === "dark" && "dark"
        }`}
      >
        <header className="slide-header">
          {userDetails && (
            <>
              <h3>Welcome Back</h3>
              <figure>
                {userDetails && userDetails.photoURL ? (
                  <img src={userDetails.photoURL} alt="user icon" />
                ) : (
                  <img src={userIcon} alt="user icon" />
                )}
              </figure>
              <p>{userDetails?.email}</p>
            </>
          )}
        </header>
        <section className="slide-body">
          <ul className="slide-body__ul">
            {userDetails ? (
              <>
                <li onClick={() => showHandler(false)}>
                  <Link to="/">
                    Home
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                  </Link>
                </li>
                <li onClick={() => showHandler(false)}>
                  <Link to="/edit">
                    Edit Cities
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </Link>
                </li>
                <li
                  onClick={() => {
                    auth.signOut();
                    showHandler(false);
                  }}
                >
                  <button>
                    Logout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                    </svg>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li onClick={() => showHandler(false)}>
                  <Link to="/login">
                    Login
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 24 24"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <g>
                        <rect fill="none" height="24" width="24" />
                      </g>
                      <g>
                        <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
                      </g>
                    </svg>
                  </Link>
                </li>
                <li onClick={() => showHandler(false)}>
                  <Link to="/signup">
                    Register
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 24 24"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <g>
                        <rect fill="none" height="24" width="24" />
                      </g>
                      <g>
                        <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
                      </g>
                    </svg>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </section>
      </div>
    </>
  );
};

export default SideDrawer;
