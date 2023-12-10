import { useContext } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { MdLogin, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { AppContext } from "../reducers/context";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { openSidebar } = useContext(AppContext);
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <Wrapper className="app-header">
      <div className="logo">
        <Link to="/">
          <span>React</span>Station
        </Link>
      </div>
      <button className="nav-toggle" onClick={openSidebar}>
        <FaBars />
      </button>
      <ul className="nav-links">
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/games">games</Link>
        </li>
        <li>
          <Link to="/results">results</Link>
        </li>
      </ul>
      {user && isAuthenticated ? (
        <div className="log-btn logout">
          <div className="user-info">
            <img src={user.picture} alt={user.name} />
            <p>{user.name.split(" ")[0]}</p>
          </div>
          <MdLogout
            onClick={() => {
              logout({ logoutParams: { returnTo: window.location.origin } });
            }}
          />
        </div>
      ) : (
        <div className="log-btn login">
          <div className="user-info">
            <p>sign in</p>
          </div>
          <MdLogin onClick={() => loginWithRedirect()} />
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  background-color: var(--primary-clr-10);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
  .logo {
    font-weight: 700;
    font-size: 40px;
    margin-top: -5px;
    width: fit-content;
    position: relative;
    padding-left: 50px;
    a {
      color: #fff;
      text-decoration: none;
    }
    span {
      color: #41b883;
      font-weight: 900;
    }
  }

  .nav-toggle {
    background: transparent;
    border: transparent;
    color: #fff;
    cursor: pointer;
    margin-right: 20px;
    svg {
      font-size: 2rem;
    }
  }

  .nav-links {
    display: none;
  }
  .log-btn {
    display: none;
  }
  @media (min-width: 900px) {
    .nav-toggle {
      display: none;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      margin-bottom: 0;
      li {
        margin: 0 0.5rem;
      }
      a {
        color: lightgray;
        font-size: 1.5rem;
        text-transform: capitalize;
        letter-spacing: 1.2px;
        padding: 0.5rem;
        text-decoration: none;
        &:hover {
          border-bottom: 2px solid #40b181;
        }
      }
    }
    .log-btn {
      display: flex;
      background: none;
      align-items: center;
      border: none;
      gap: 10px;
      margin-right: 10px;
      svg {
        color: #fff;
        font-size: 1.5rem;
        cursor: pointer;
      }
      .user-info {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: 400;
        font-size: 1rem;
        p {
          margin-bottom: 0;
        }
        img {
          width: 35px;
          border-radius: 50%;
        }
      }
    }
    .login {
      cursor: pointer;
    }
  }
`;

export default Header;
