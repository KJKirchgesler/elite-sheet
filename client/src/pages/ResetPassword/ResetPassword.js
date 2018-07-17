import React, { Component } from "react";
import Nav from "../../components/nav";
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
        <Nav />
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
