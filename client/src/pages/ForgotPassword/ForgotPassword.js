import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API.js"

class ForgotPassword extends Component {

  state = {
    email: "",
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

    let userData = {
      email: this.state.email
    }

    if (!userData.email) {
      return;
    }

    API.forgotPassword(userData)
    .then((res) => {
      console.log(res);
      this.setState({
        message: "An email has been sent to " + this.state.email + " with further instructions."
      })
    }).catch((err) => {
      console.log(err);
      this.setState({
        message: "There was an error. Please ensure your email address is correct."
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
          <h1>Forgot your password?</h1>
          {this.state.message ? 
              (<p>{this.state.message}</p>) :
              (<p>Please enter the email address for your eliteSheets account to receive an email with a link to change your password.</p>)}
            <form className="login">
                <div className="form-group">
                    <label for="inputEmail">Email Address</label>
                    <input type="Email" 
                           className="form-control" 
                           id="login-email" 
                           placeholder="Email"
                           name="email"
                           onChange={this.handleInputChange}></input>
                </div>
                <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Reset Password</button>
            </form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
