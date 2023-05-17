import React, { Component } from "react";
import ReactDOM from "react-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLogin: false,
    };
  }

  handleUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.username === "admin" && this.state.password === "admin") {
      this.setState({
        isLogin: true,
      });

        //if the username and password are correct then set it to local storage
        localStorage.setItem("username", JSON.stringify(this.state.username));

    } else {
      //fetch users data from json placeholder api that the username is equal to the username in the database
      //and the password is equal the last 4 digits for 'lat' property in the address object
      //if the user is found then set the state of isLogin to true
      // and save the user data in local storage
      fetch(
        "https://jsonplaceholder.typicode.com/users?username=" +
          this.state.username
      )
        .then((response) => response.json())
        .then((user) => {
          if (user[0].address.geo.lat.slice(-4) === this.state.password) {
            this.setState({
              isLogin: true,
            });

            localStorage.setItem("username", JSON.stringify(user));
          }
        })
        .catch((error) => {
          alert("Username or password is incorrect");
        });
    }
  };

  render() {
    if (this.state.isLogin) {
      return (
        <div>
          <h1>Welcome {this.state.username}</h1>
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
            <label>Password</label>
            <input
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      );
    }
  }
}

export default Login;
