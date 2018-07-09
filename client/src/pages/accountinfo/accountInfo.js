import React, { Component } from "react";
import API from "../../utils/API.js"

class AccountInfo extends Component {

  state = {
    newSheetTitle: "",
    username: "",
    useremail: "",
    userid: "",
    createdSheets: [],
    sharedSheets: [],
  }

  getUserData = () => {
    API.getUserData()
    .then((res) => {
      console.log(res);
      if (res.data.name === undefined) {
        window.location.replace("/login");
      } else {
        this.setState({
          username: res.data.name,
          email: res.data.email,
          id: res.data.id
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getUserData();
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
                  aria-expanded="false">
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
          <p>User: {this.state.username}</p>
          <p>Email: {this.state.useremail}</p>
          <div className="card">
            <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
          </div>
        </div>
      </div>
    )}
}

export default AccountInfo;