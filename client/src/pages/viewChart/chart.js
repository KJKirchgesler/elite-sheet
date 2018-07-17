import React, { Component } from "react";
import API from "../../utils/API.js";
import BarChartComponent from "./BarChartComponent";
import socket from "../../utils/socketAPI";


class ViewChart extends Component {

  state = {
    userName: "",
    userEmail: "",
    userId: "",
    transactions: [],
    collaborators: [],
    sheetData: {}
  }

  handleInputChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  getUserData = () => {
    API.getUserData()
    .then((res) => {
      //console.log(res.data.email);
      if (res.data.name === undefined) {
        window.location.replace("/login");
      } else {
        this.setState({
          userName: res.data.name,
          userEmail: res.data.email,
          userId: res.data.id
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  viewSheet = () => {
    let pathArray = window.location.pathname.split("/");
    let sheetId = pathArray[2];
    let userId = pathArray[3];

    let sheetData = {
      sheetId: sheetId,
      userId: userId
    }

    API.viewSheet(sheetData)
    .then((res) => {
      let transactions = res.data.Transaction;
      this.setState({
        transactions: transactions
      });
      console.log("here are the transactions for this sheet-------")
      console.log(this.state.transactions);
    }).catch((err) => {
      console.log(err);
      window.location.replace("/login");
    })
  }

  viewCollaborators = () => {
    let pathArray = window.location.pathname.split("/");
    let sheetId = pathArray[2];
    let userId = pathArray[3];

    API.viewCollaborators(sheetId)
    .then((res) => {
      let collaborators = res.data;
      this.setState({
        collaborators: collaborators
      });
      console.log("Here are the collaborators on this sheet:")
      console.log(this.state.collaborators)
    }).catch((err) => {
      console.log(err);
    });
  }

  getSheetData = () => {
    let pathArray = window.location.pathname.split("/");
    let sheetId = pathArray[2];
    
    API.getSheetData(sheetId)
    .then((res) => {
      this.setState({
        sheetData: res.data
      });

      console.log("here is the sheet data ----------")
      console.log(this.state.sheetData);
    }).catch((err) => {
      console.log(err);
    })
  }

  transChanged = (trans) => {
    let pathArray = window.location.pathname.split("/");
    let URLSheetId = pathArray[2];
    
    // console.log(URLSheetId);
    // console.log(trans.sheetId);
    // console.log(parseInt(trans.sheetId) == URLSheetId)

    if (parseInt(trans.sheetId) == URLSheetId) {
      console.log("match")
      let updatedTransactions = this.state.transactions.push(trans)
      this.setState({
        transactions: updatedTransactions
      })
      alert("New transaction for this sheet");
    }
  }

  componentDidMount() {
    this.getUserData();
    this.viewSheet();
    this.viewCollaborators();
    this.getSheetData();
    socket.on("transactionChanged", this.transChanged);
  }

  componentWillUnmount() {
    socket.off("transactionChanged", this.transChanged);
  }

  deleteTransaction = event => {
    let transactionData = {
      sheetId: this.state.sheetData.id,
      transactionId: "",//get this from button???
      userId: this.state.userId
    }

    API.deleteTransaction(transactionData)
    .then((res) => {
      console.log("transaction deleted");
      //this.viewSheet();
    }).catch((err) => {
      console.log(err);
      alert("There was an error with the server. Please try again.")
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
        <BarChartComponent />
      </div>
    </div>
    )}
}

export default ViewChart;