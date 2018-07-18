import React, { Component } from "react";
import API from "../../utils/API.js";
import Logo from "../../assets/images/eliteSheetsLogo.png";

class HelloBootstrap extends Component {
  
  state = {
    userName: "",
    userEmail: ""
  }

  getUserData = () => {
    let pathArray = window.location.pathname.split("/");

    API.getUserData()
    .then((res) => {
     
      if (res.data.name === undefined &&
        pathArray[1] !== "login" &&
        pathArray[1] !== "" &&
        pathArray[1] !== "signup") {
        window.location.replace("/login");
      } else {
        this.setState({
          userName: res.data.name,
          userEmail: res.data.email,
          //userId: res.data.id
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  logout = event => {
    event.preventDefault();

    API.logout()
    .then((res) => {
      console.log(res)
      this.setState({
        username: ""
      })
      window.location.replace("/login");
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount () {
    this.getUserData();
  }

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img src={Logo}/>
          </a>
            {!this.state.userName ? (
              <a href="/login"><p>Login</p></a>
              ) : (
              <div>
                <p>Welcome, {this.state.userName}</p>
                <p>Email: {this.state.userEmail}</p>
                <button onClick={this.logout}>Log Out</button>
              </div>)}
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  User
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/login">
                    Login
                  </a>
                  <a className="dropdown-item" href="/signup">
                    Sign up
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="/accountinfo">
                    Account Info
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav> 
    );
  }
}

export default HelloBootstrap;