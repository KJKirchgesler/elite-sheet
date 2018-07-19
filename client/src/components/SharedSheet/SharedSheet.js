import React from "react";
import API from "../../utils/API";
import { Input, TextArea, FormBtn, FormBtnLeft, FormBtnRight } from "../../components/Form";


class SharedSheet extends React.Component {
  state = {
    otherUsers: [],
    selectedUserId: "" ,
  }

  viewSheet = event => {
    event.preventDefault();

    let userId = this.props.userId;
    let sheetId = this.props.sheetId;

    window.location.replace("/viewchart/" + sheetId + "/" + userId);
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h6>{this.props.sheetName}</h6>
        
          <div className="card-body">
            <p>eliteSheets sheet ID: {this.props.sheetId}</p>
            <p>Other users with access to this sheet:</p>
            <ul>
            {
              
                this.props.sheetUsers.map(user =>(
                  <li key={user.name}>{user.name}
                  </li>
                ))
            }
            </ul>
            
            
            <div className="btn-group ml-auto" role="group">
              <FormBtn onClick={this.viewSheet}>Go to sheet</FormBtn>
            </div>
      </div>
        </div>
      </div>
    )
  }
}

export default SharedSheet;

