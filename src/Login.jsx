import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { Todos } from "./Todos";
import { NotFound } from "./NotFound";
import "./Login.css";
import Info from "./Info";
import { async } from "q";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsLogin(false);
    setUsername("");
    setPassword("");
    setName("");
    setUserId(0);
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      setIsLogin(true);
      localStorage.setItem("username", JSON.stringify(username));
    } else {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?username=${username}`
        );
        const users = await response.json();
        if (
          users.length > 0 &&
          users[0].address.geo.lat.slice(-4) === password
        ) {
          setIsLogin(true);
          setName(users[0].name);
          setUserId(users[0].id);
          localStorage.setItem("username", JSON.stringify(users));
        } else {
          alert("Username or password is incorrect");
        }
      } catch (error) {
        alert("An error occurred while fetching user data. Please try again.");
      }
    }
  };

  if (isLogin) {
    return (
      <>
        <navbar className={"navbar"}>
          <NavLink className={"NavLink"} to="#" onClick={handleLogout}>
            Logout
          </NavLink>
          <NavLink className={"NavLink"} to={`/${username}/Home`} replace>
            Home
          </NavLink>
          <NavLink className={"NavLink"} to={`/${username}/todos`}>
            Todos
          </NavLink>
          <NavLink className={"NavLink"} to={`/${username}/posts`}>
            Posts
          </NavLink>
          <NavLink className={"NavLink"} to={`/${username}/albums`}>
            Albums
          </NavLink>
          <NavLink className={"NavLink"} to={`/${username}/info`}>
            Info
          </NavLink>
        </navbar>
        <div>
          <h1>Welcome {username}</h1>
        </div>
        <Routes>
          <Route path={`login`} />
          <Route path={`/${username}/Home`} />
          <Route
            path={`/${username}/todos`}
            element={<Todos name={`${name}`} id={`${userId}`} />}
          />
          <Route path={`/${username}/posts`} />
          <Route path={`/${username}/albums`} />
          <Route
            path={`/${username}/info`}
            element={<Info username={username} />}
          />
        </Routes>
      </>
    );
  } else {
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <Link to="#" className="button-link" onClick={handleLogout}>
          Logout
        </Link>
      </div>
    );
  }
}

export default Login;
