import React, { Component } from "react";
import API from "../../utils/API.js"
import { Input, TextArea, FormBtn, FormBtnLeft, FormBtnRight } from "../../components/Form";

class AccountInfo extends Component {

  state = {
    newSheetTitle: "",
    userName: "",
    userEmail: "",
    userId: "",
    createdSheets: [],
    sharedSheets: [],
    newSheetName: ""
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
      userId: this.state.userId
    }

    if (this.state.newSheetName !== "") {
      console.log(sheetData)

      API.createSheet(sheetData)
      .then((res) => {
        let newSheet = res.data;
        let updatedSheets = this.state.createdSheets.push(newSheet);
        console.log("updated created sheets-------")
        console.log(this.state.createdSheets);
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
      // console.log("Here are the sheets this user has created-----");
      // console.log(this.state.createdSheets);
    })
  }

  viewShared = () => {
    API.viewSharedSheets()
    .then((res) => {
      let sharedSheets = res.data;
      this.setState({
        sharedSheets: sharedSheets
      })
      // console.log("Here are the shared sheets for this user-----")
      // console.log(res);
    })
  }

  grantAccess = event => {

  }

  withdrawAccess = event => {

  }

  viewSheet = event => {

  }

  componentDidMount() {
    this.getUserData();
    this.viewCreated();
    this.viewShared();
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

          <h2>Welcome!</h2>
          <h3>User: {this.state.userName}</h3>
          <h3>Email: {this.state.userEmail}</h3>
          

          <div className="card mt-3">
            <div className="card-body">
              <form className="form-inline">
                <FormBtn onClick={this.createSheet}>Create a new eliteSheet</FormBtn>
                  <Input    
                    className="form-control ml-3"
                    placeholder="New sheet name"
                    name="newSheetName"
                    onChange={this.handleInputChange}
                  />
              </form>
 
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">My eliteSheets</h5>

              <div className="card">
                <div className="card-body">
                  <form className="form-inline">
                    <h5 className="card-title">sheetName with Company</h5>
          
                      <div className="dropdown">
                        <button className="btn btn-outline-secondary dropdown-toggle" 
                          type="button" id="dropdownMenuButton" 
                          data-toggle="dropdown" 
                          aria-haspopup="true" 
                          aria-expanded="false"
                          className="form-control ml-5 mr-3"
                        >
                          Invite a company to join
                        </button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                          </div>
                      </div>
                      <div className="btn-group ml-auto" role="group">
                      <FormBtn>Invite</FormBtn>
                    </div>
                    <div className="btn-group ml-auto" role="group">
                      <FormBtn>Go to sheet</FormBtn>
                      <FormBtn>Delete sheet</FormBtn>
                    </div>
                  </form>
         

                <div className="card mt-3">
                  <div className="card-body">
                    <h5 className="card-title">Users that I have granted access to this sheet:</h5>
                      <div className="card m-2">
                        <div className="card-body">
                          <form className="form-inline">
                            <h5 className="card-title">Company 1</h5>
                              <FormBtnRight>Withdraw Access</FormBtnRight>
                          </form>
                        </div>
                      </div>
                      <div className="card m-2">
                        <div className="card-body">
                          <form className="form-inline">
                            <h5 className="card-title">Company 2</h5>
                              <FormBtnRight>Withdraw Access</FormBtnRight>
                          </form>
                        </div>
                      </div>       
                    </div>
                  </div>

                </div>
              </div>
              
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Other Sheets that I have access to:</h5>
                <div className="card">
                  <div className="card-body">
                    <form className="form-inline">
                      <h5 className="card-title">sheetName with Company</h5>
                        <FormBtnRight>
                          Go to Sheet
                        </FormBtnRight>
                    </form>    
                  </div>
                </div>

                <div className="card mt-2">
                  <div className="card-body">
                    <form className="form-inline">
                      <h5 className="card-title">sheetName with Company</h5>
                        <FormBtnRight>
                          Go to Sheet
                        </FormBtnRight>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD
    </div>
=======
>>>>>>> 004e8d6c63964f3ad5d4bfeaeec1fdb7ea169fc7
    )}
}

export default AccountInfo;