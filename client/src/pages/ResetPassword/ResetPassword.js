import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API.js"

class ResetPassword extends Component {

  state = {
    password: "",
    confirmPassword: "",
    message: ""
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

    
    if (!this.state.password || !this.state.confirmPassword) {
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        message: "Your passwords do not match."
      })
      return;
    }

    if (this.state.password.length < 6 ) {
      this.setState({
        message: "Please ensure your password is at least 6 characters long."
      });
      return;
    }

    let pathArray = window.location.pathname.split("/");
    let passwordToken = pathArray[2];
    console.log(passwordToken)

    let userData = {
          password: this.state.password,
          passwordToken: passwordToken
        }

    API.resetPassword(userData)
    .then((res) => {
      console.log(res);
      this.setState({
        message: "Your password has been updated. Proceed to the login page to access your account."
      })
    }).catch((err) => {
      console.log(err);
      this.setState({
        message: "There was an error. Please try again."
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
          <h1>Reset Password</h1>
          {this.state.message ? 
              (<p>{this.state.message}</p>) :
              (<p>Please enter and confirm a new password below.</p>)}
            <form className="login">
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type ="password" 
                          className= "form-control" 
                          id="password-input" 
                          placeholder="Password"
                          name="password"
                          onChange={this.handleInputChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Confirm Password</label>
                    <input type ="password" 
                          className= "form-control" 
                          id="confirmPassword-input" 
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          onChange={this.handleInputChange}></input>
                </div>
                <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Reset Password</button>
            </form>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
