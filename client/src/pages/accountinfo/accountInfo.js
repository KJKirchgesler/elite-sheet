import React, { Component } from "react";
import API from "../../utils/API.js"
import { Input, TextArea, FormBtn, FormBtnLeft, FormBtnRight } from "../../components/Form";



class AccountInfo extends Component {

  state = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    errorMessage:""
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
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    }

    if (!userData.email || !userData.password || !this.state.confirmPassword || !userData.name) {
      this.setState({
        errorMessage: "Please ensure all fields are filled."
      });
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errorMessage: "Please ensure your passwords match."
      });
      return;
    }

    if (this.state.password.length < 6 ) {
      this.setState({
        errorMessage: "Please ensure your password is at least 6 characters long."
      });
      return;
    }

    API.signup(userData)
    .then((res) => {
      // console.log(res);
      if (res.data.errors) {
        this.setState({
          errorMessage: "There was an error with the server:\n" + res.data.errors[0].message
        })
      } else {
        window.location.replace("/login");
      }
    }).catch((err) => {
      console.log(err);
      this.setState({
        errorMessage: "There was an error. Please try again."
      });
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
        <h2>Welcome, Company Name</h2>
        <h3>email: example@email.com</h3>
          <div className="card mt-3">
            <div className="card-body">
              <form className="form-inline">
                <FormBtn>Create a new eliteSheet</FormBtn>
                  <Input    
                    className="form-control ml-3"
                    placeholder="New sheet name"
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
              <div className="card mt-3">
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
                      <FormBtn>Go to sheet</FormBtn>
                      <FormBtn>Delete sheet</FormBtn>
                    </div>
                  </form>
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
    )}
}

export default AccountInfo;