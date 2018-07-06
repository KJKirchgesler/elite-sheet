import React, { Component } from "react";
import API from "./utils/API.js";

class HelloBootstrap extends Component {
  
  state = {
    username: ""
  }

  getUserData = () => {
    API.getUserData()
    .then((res) => {
      this.setState({
        username: res.data.name
      })
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
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount () {
    this.getUserData();
  }

  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            eliteSheets 
            {!this.state.username ? (
              <p>Not logged in</p>
              ) : (
              <div>
                <p>Welcome, {this.state.username}</p>
                <button onClick={this.logout}>Log Out</button>
              </div>)}
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
       <div className="jumbotron">
      <h1>Welcome to eliteSheets</h1>
      <p>
        Are you looking for greater transparency and more efficiently updated transactions with the partners with whom you do business? If so, we have the perfect solution for you.
      </p>
    </div>
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">That sounds great! How does it work?</h3>
      </div>
      <div className="card-body">
        <p className="card-text">
        An app tracking receivables and payables between at least two companies. A user signs up, logs in, and can create new eliteSheets, view eliteSheets that they are a part of, and accept invitations from other companies to start an eliteSheet with them. On each eliteSheet, a company representative can add new transactions and see how they balance with transactions from the other company. It allows two or more companies to keep a close eye on their transactions and ensure that each company’s balance is paid accurately and on time.
        </p>
      </div>
    </div>
  </div>
    );
  }
}

export default HelloBootstrap;
