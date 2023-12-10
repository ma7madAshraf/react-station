import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AppContext } from "../reducers/context";
import styled from "styled-components";
import { FaTimes, FaClipboardList, FaHome } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import { MdLogin, MdLogout } from "react-icons/md";

const Sidebar = () => {
  const { sidebar, closeSidebar } = useContext(AppContext);
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <SidebarContainer>
      <aside className={`${sidebar ? "show-sidebar sidebar" : "sidebar"} `}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={closeSidebar}>
            <FaTimes />
          </button>
        </div>
        <ul className="links">
          <li>
            <Link to="/" onClick={closeSidebar}>
              <FaHome /> home
            </Link>
          </li>
          <li>
            <Link to="/games" onClick={closeSidebar}>
              {" "}
              <IoGameController /> games
            </Link>
          </li>
          <li>
            <Link to="/results" onClick={closeSidebar}>
              <FaClipboardList /> results
            </Link>
          </li>
          <li>
            {user && isAuthenticated ? (
              <div
                className="log-btn logout"
                onClick={() => {
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  });
                }}
              >
                <Link className="user-info">
                  <MdLogout /> log out
                </Link>
              </div>
            ) : (
              <Link
                className="log-btn login"
                onClick={() => loginWithRedirect()}
              >
                <MdLogin />
                log in
              </Link>
            )}
          </li>
        </ul>
      </aside>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: white;
    border-color: transparent;
    transition: 0.3s;
    cursor: pointer;
    margin-top: 0.2rem;
    border-radius: 6px;
    display: flex;
  }
  .close-btn:hover {
    color: darkred;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: flex;
    align-items: center;
    text-align: left;
    font-size: 2rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--primary-clr-2);
    transition: var(--transition);
    letter-spacing: 2px;
    width: 100%;
    gap: 10px;
  }
  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--primary-clr-2);
    color: black;
  }
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--primary-clr-10);
    transition: 0.3s;
    transform: translate(-100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`;

export default Sidebar;
