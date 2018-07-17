import React, { Component } from "react";
import Nav from "../../components/nav";
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
        <Nav />
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
