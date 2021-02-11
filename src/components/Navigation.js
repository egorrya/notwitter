import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/" className="nav__home">
            <FontAwesomeIcon icon={faHome} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <h1 className="logo">Anonymter</h1>
        </li>
        <li>
          <Link to="/profile" className="nav__user">
            <span>{userObj.displayName}</span>
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
