import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { Link, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { Todos } from "./Todos";
import { Posts } from "./Posts";
import "./Login.css";
import Info from "./Info";
import { async } from "q";
import Albums from "./Albums";
import Photos from "./Photos";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  let listUsers = JSON.parse(localStorage.getItem("listUsers")) || [];

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogout = () => {
    //localStorage.removeItem("username");
    localStorage.removeItem("currentUser");
    setIsLogin(false);
    setUsername("");
    setPassword("");
    setName("");
    setUserId(0);
    navigate("./login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin") {
      setIsLogin(true);
      //localStorage.setItem("username", JSON.stringify(username));
      localStorage.setItem("currentUser", JSON.stringify(username));
      listUsers.push(username);
      localStorage.setItem("listUsers", JSON.stringify(listUsers));
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
          //localStorage.setItem("username", JSON.stringify(users));
          localStorage.setItem("currentUser", JSON.stringify(users));
          listUsers.push(users[0]); // to not enter as an array of object into listUsers array
          localStorage.setItem("listUsers", JSON.stringify(listUsers));
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
          <NavLink className={"NavLink welcome"}>Welcome {username}!</NavLink>
          <NavLink className={"NavLink"} to="#" onClick={handleLogout}>
            Logout
          </NavLink>
          <NavLink className={"NavLink"} to={`/${username}/todos`} replace>
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

        <Routes>
          <Route path={`./login`} />
          <Route
            path={`/${username}/todos`}
            element={<Todos name={`${name}`} id={`${userId}`} />}
          />
          <Route
            path={`/${username}/posts`}
            element={<Posts name={`${name}`} id={`${userId}`} />}
          />
          <Route
            path={`/${username}/albums`}
            element={<Albums name={`${name}`} id={`${userId}`} />}
          />
          <Route path="/albums/:albumId/photos" element={<Photos />} />
          <Route
            path={`/${username}/info`}
            element={<Info username={username} />}
          />
          {/*   <Route path="*" element={<NotFound name={`${name}`} />} /> */}
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
