import React, { Component } from "react";
import Nav from "../../components/nav";
import { Link } from "react-router-dom";
import API from "../../utils/API.js"

class Login extends Component {

  state = {
    email: "",
    password: "",
    errorMessage: "",
    stayLoggedIn: false
  }

  getUserData = () => {
    API.getUserData()
    .then((res) => {
      //console.log(res.data.name);
      if (res.data.name) {
        window.location.replace("/");
      }
    }).catch((err) => {
      console.log(err);
      window.location.replace("/");
    })
  }

  componentDidMount() {
    this.getUserData();
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

  handleCheckBox = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    let userData = {
      email: this.state.email,
      password: this.state.password,
      remember_me: this.state.stayLoggedIn
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
        <Nav />
        <div className="jumbotron">
          <h1>Login</h1>
          {this.state.errorMessage ? 
              (<p>{this.state.errorMessage}</p>) :
              (<p>Please complete the form below to log in to eliteSheets. If another user was logged in, he or she has been automatically logged out.</p>)}
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
                <br/>
                <label>   
                  <input
                    name="stayLoggedIn"
                    type="checkbox"
                    checked={this.state.stayLoggedIn}
                    onChange={this.handleCheckBox} />
                    Keep me logged in
                </label>
            </form>
        </div>
      </div>
    );
  }
}

export default Login;
