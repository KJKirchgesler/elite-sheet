import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API.js"

class Login extends Component {

  state = {
    email: "",
    password: "",
    errorMessage: ""
  }

  handleInputChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  handleInputChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    let userData = {
      email: this.state.email,
      password: this.state.password,
    }

    if (!userData.email || !userData.password) {
      return;
    }

    API.login(userData)
    .then((res) => {
      //console.log(res);
      window.location.replace("/accountinfo");
    }).catch((err) => {
      console.log(err);
      this.setState({
        errorMessage: "There was an error logging in. Please ensure your credentials are correct."
      })
    })
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            eliteSheets
          </a>
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
              <li className="nav-item">
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
        <div className="jumbotron">
          <h1>Login</h1>
          {this.state.errorMessage ? 
              (<p>{this.state.errorMessage}</p>) :
              (<p>Please complete the form below to log in to eliteSheets.</p>)}
            <form className="login">
                <div className="form-group">
                    <label htmlFor="inputEmail">Email Address</label>
                    <input type="Email" 
                           className="form-control" 
                           id="login-email" 
                           placeholder="Email"
                           name="email"
                           onChange={this.handleInputChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type ="password" 
                           className= "form-control" 
                           id="login-password" 
                           placeholder="Password"
                           name="password"
                           onChange={this.handleInputChange}></input>
                </div>
                <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Login</button>
                <a href="/forgot">Forgot my password</a>
            </form>
        </div>
      </div>
    );
  }
}

export default Login;
