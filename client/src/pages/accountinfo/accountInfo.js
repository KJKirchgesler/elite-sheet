import React, { Component } from "react";
import Nav from "../../components/nav";
import API from "../../utils/API.js";
import Table from "../../components/Table";
import { Input, TextArea, FormBtn, FormBtnLeft, FormBtnRight } from "../../components/Form";
import CreatedSheet from "../../components/CreatedSheet"
import SharedSheet from "../../components/SharedSheet"

class AccountInfo extends Component {

  state = {
    newSheetTitle: "",
    userName: "",
    userEmail: "",
    userId: "",
    createdSheets: [],
    sharedSheets: [],
    newSheetName: "",
    otherUsers: []
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

  createSheet = event => {
    event.preventDefault();
    
    let sheetData = {
      newSheetName: this.state.newSheetName,
      // userId: this.state.userId
    }

    if (this.state.newSheetName !== "") {
      console.log(sheetData)

      API.createSheet(sheetData)
      .then((res) => {
        // let newSheet = res.data;
        // let updatedSheets = this.state.createdSheets.push(newSheet);
        alert("New Sheet Created");
        this.viewCreated();
        // console.log("updated created sheets-------")
        // console.log(this.state.createdSheets);
      })
    } 
  }

  viewCreated = () => {
    API.viewCreatedSheets()
    .then((res) => {
      let createdSheets = res.data;
      this.setState({
        createdSheets: createdSheets
      })
      console.log("Here are the sheets this user has created-----");
      console.log(this.state.createdSheets);
    })
  }

  viewShared = () => {
    API.viewSharedSheets()
    .then((res) => {
      let sharedSheets = res.data;
      this.setState({
        sharedSheets: sharedSheets
      })
      console.log("Here are the shared sheets for this user-----")
      console.log(this.state.sharedSheets);
    })
  }

  viewOtherUsers = () => {
    API.viewOtherUsers().
    then((res) => {
      let otherUsers = res.data;
      this.setState({
        otherUsers: otherUsers
      }); 
      console.log("Here are the other users signed up for elitesheets------");
      console.log(this.state.otherUsers);
    })
  }

  // grantAccess = event => {
  //   //Kristen: I'll let you figure out exactly how how you want to get the sheetId and the other user's Id. Just put the data in an object:

  //   let sheetData = {
  //     sheetId: "",
  //     otherUserId: "",
  //     creatorUserId: ""//this is logged in user id
  //   }

  //   API.grantAccess(sheetData)
  //   .then((res) => {
  //     console.log('access granted to ' + sheetData.otherUserId + " for sheet " + sheetData.sheetId);
  //     alert("Access granted.")
  //     this.viewCreated();
  //   }).catch((err) => {
  //     console.log(err);
  //     alert("There was an error with the server. Please try again.")
  //   })
    
  // }

  // withdrawAccess = event => {
  //   //Kristen: I'll let you figure out exactly how how you want to get the sheetId and the other user's Id. Just put the data in an object:

  //   let sheetData = {
  //     sheetId: "",
  //     otherUserId: "",
  //     creatorUserId: ""//this is logged in user id
  //   }

  //   API.withdrawAccess(sheetData)
  //   .then((res) => {
  //     console.log("access withdrawn from sheet " + sheetData.sheetId + " for user " + sheetData.creatorUserId)
  //   }).catch((err) => {
  //     console.log(err);
  //     alert("There was an error with the server. Please try again.")
  //   })
  // }

  // viewSheet = event => {
  //   let userId = this.state.userId;
  //   let sheetId = "";

  //   window.location.replace("/viewchart/" + sheetId + "/" + userId);
  // }

  // deleteSheet = event => {
  //   let sheetData = {
  //     sheetId: "",//get this from button???
  //     userId: this.state.userId
  //   }

  //   API.deleteSheet(sheetData)
  //   .then((res) => {
  //     console.log("sheet deleted")
  //     this.viewCreated();
  //     this.viewShared();
  //   }).catch(function(err) {
  //     console.log(err);
  //     alert("There was an error with the server. Please try again.")
  //   })

  //}

  componentDidMount() {
    this.getUserData();
    this.viewCreated();
    this.viewShared();
    this.viewOtherUsers();
  }

  handleInputChange = event => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="container">
        <Nav />
        <div className="jumbotron">
          

          <div className="card mt-3">
            <div className="card-body">
              <form className="form-inline">
                <Input    
                  className="form-control ml-3"
                  placeholder="New sheet name"
                  name="newSheetName"
                  onChange={this.handleInputChange}/>
                <FormBtn onClick={this.createSheet}>Create a new eliteSheet</FormBtn>  
              </form>
              <h5 className="card-title">My own eliteSheets which I have created:</h5>
              <div className="card">
                <div className="card-body">
                {!this.state.createdSheets.length ? (
                    <p><i>You haven't created any of your own eliteSheets. Create one using the input and button above.</i></p>
                ):(
                  this.state.createdSheets.map(sheet => (
                    <CreatedSheet key={sheet.Sheet.id}
                                  sheetName={sheet.Sheet.name}
                                  sheetId={sheet.Sheet.id}
                                  sheetUsers={sheet.Sheet.User}
                                  userId={this.state.userId}
                                  viewCreated={this.viewCreated}
                                  />
                  ))
                )}
         

                
                </div>
              </div>

          <h5 className="card-title">Shared Sheets</h5>
              <div className="card">
                <div className="card-body">
                {!this.state.sharedSheets.length ? (
                    <p><i>No one has shared sheets with you.</i></p>
                ):(
                  this.state.sharedSheets.map(sheet => (
                    <SharedSheet key={sheet.Sheet.id}
                                  sheetName={sheet.Sheet.name}
                                  sheetId={sheet.Sheet.id}
                                  sheetUsers={sheet.Sheet.User}
                                  userId={this.state.userId}
                                  />
                  ))
                )}
         

                
                </div>
              </div>



        

            </div>
          </div>
        </div>
      </div>
    )}
}

export default AccountInfo;