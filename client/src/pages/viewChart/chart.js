import React, { Component } from "react";
import Nav from "../../components/nav";
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
      let labels = [];
      let datasets = [{
        label: "Total Balance",
        data: []
      }];
      transactions.forEach(t => {
        labels.push(t.companyName);
        datasets[0].data.push(t.totalBalance)
      });
      this.setState({
        transactions : transactions,
        chartData:{
          labels: labels,
          datasets: datasets
        }
      });
      console.log("here are the transactions for this sheet-------")
      console.log(this.state.chartData);
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
      this.viewSheet();
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
        <Nav />
        <div className="jumbotron">
        <BarChartComponent transactions ={this.state.chartData}/>
      </div>
    </div>
    )}
}

export default ViewChart;