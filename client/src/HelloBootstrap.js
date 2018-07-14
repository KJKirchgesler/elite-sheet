import React, { Component } from "react";
import API from "./utils/API.js";
import Nav from "./components/nav";

class HelloBootstrap extends Component {

  render() {
    return (
      <div className="container">
      <Nav />
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
        An app tracking receivables and payables between at least two companies. A user signs up, logs in, and can create new eliteSheets and view eliteSheets to which other users have granted them access. On each eliteSheet, a company representative can add new transactions and see how they balance with transactions from the other company. It allows two or more companies to keep a close eye on their transactions and ensure that each company’s balance is paid accurately and on time.
        </p>
      </div>
    </div>
  </div>
    );
  }
}

export default HelloBootstrap;
