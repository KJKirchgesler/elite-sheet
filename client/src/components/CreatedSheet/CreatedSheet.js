import React from "react";
import API from "../../utils/API";
import { Input, TextArea, FormBtn, FormBtnLeft, FormBtnRight } from "../../components/Form";


class OneResult extends React.Component {
	state = {
		otherUsers: [],
		selectedUserId: "" ,
	}

	viewOtherUsers = () => {
    API.viewOtherUsers().
    then((res) => {
      let otherUsers = res.data;
      this.setState({
        otherUsers: otherUsers,
        selectedUserId: otherUsers[0].id
      }); 
      console.log("Here are the other users signed up for elitesheets------");
      console.log(this.state.otherUsers);
    })
  }

  grantAccess = event => {
  	event.preventDefault()

    let sheetData = {
      sheetId: this.props.sheetId,
      otherUserId: this.state.selectedUserId,
      creatorUserId: this.props.userId
    }

    API.grantAccess(sheetData)
    .then((res) => {
      console.log('access granted to ' + sheetData.otherUserId + " for sheet " + sheetData.sheetId);
      this.props.viewCreated();
      //alert("Access granted.")
    }).catch((err) => {
      console.log(err);
      alert("There was an error with the server. Please try again.")
    })
    
  }

  withdrawAccess = event => {
  	event.preventDefault();

  	let otherUserId = event.target.value

    let sheetData = {
      sheetId: this.props.sheetId,
      otherUserId: otherUserId,
      creatorUserId: this.props.userId
    }

    API.withdrawAccess(sheetData)
    .then((res) => {
      console.log("access withdrawn from sheet " + sheetData.sheetId + " for user " + sheetData.creatorUserId);

      this.props.viewCreated();
      // this.setState({
      // 	sheetUsers: this.state.sheetUsers.filter(function(item) {
      // 		if (item.id !== sheetData.sheetId) {
      // 			return item;
      // 		}
      // 	})
      // })
      //alert("Access withdrawn.")
    }).catch((err) => {
      console.log(err);
      alert("There was an error with the server. Please try again.")
    })
  }

  deleteSheet = event => {
  	event.preventDefault();

    let sheetData = {
      sheetId: this.props.sheetId,
      userId: this.props.userId
    }

    API.deleteSheet(sheetData)
    .then((res) => {
      console.log("sheet deleted")
      this.props.viewCreated();
    }).catch(function(err) {
      console.log(err);
      alert("There was an error with the server. Please try again.")
    })
  }

  viewSheet = event => {
  	event.preventDefault();

    let userId = this.props.userId;
    let sheetId = this.props.sheetId;

    window.location.replace("/viewchart/" + sheetId + "/" + userId);
  }

  getSelectedUser = event => {
  	this.setState({
  		selectedUserId: event.target.value
  	})

  	console.log(this.state.selectedUserId);
  }

  filterSheetUsers = () => {
  	let allSheetUsers = this.props.sheetUsers;
   	let filteredUsers = []

  	for (let i = 0; i < allSheetUsers.length; i++) {
  		// console.log(allSheetUsers[i].UserSheet.userIsCreator)
  		if (allSheetUsers[i].UserSheet.userIsCreator === 0) {

  			filteredUsers.push(allSheetUsers[i])
  		}
  	}
  	
  	return filteredUsers;
  	// this.setState({
  	// 	sheetUsers: filteredUsers
  	// })
  }

  componentDidMount() {
  	this.viewOtherUsers();
  }

	render() {
		const sheetUsers = this.filterSheetUsers();
		return (
			<div className="card">
				<div className="card-header">
					<h6>{this.props.sheetName}</h6>
				</div>
					<div className="card-body">
						<p>eliteSheets sheet ID: {this.props.sheetId}</p>
						<p>Other users with access to this sheet:</p>
						<ul>
						{!sheetUsers.length ? (
								<li><i>No other users have access to this sheet.</i></li>
							) : (
								sheetUsers.map(user =>(
									<li key={user.name}>{user.name}
										<FormBtn value={user.id}
														 onClick={this.withdrawAccess}>Withdraw Access</FormBtn>
									</li>
								))
							)}
						</ul>
					<form className="form-inline">
	            <div className="form-group">
	              <label htmlFor="sel1">To grant access to this sheet to another user, select another user from this list:</label>
	              <select className="form-control" 
	              				id="sel1" 
	              				name="selectedUserId"
	              				onChange={this.getSelectedUser}>
	                {this.state.otherUsers.map((user) => 
	                  <option key={user.id}
	                  value={user.id}>{user.name}</option>
	                )}
	              </select>
	            </div>
	            <div className="btn-group ml-auto" role="group">
	            <FormBtn onClick={this.grantAccess}>Invite</FormBtn>
	          </div>
	          <div className="btn-group ml-auto" role="group">
	            <FormBtn onClick={this.viewSheet}>Go to sheet</FormBtn>
	            <FormBtn onClick={this.deleteSheet}>Delete sheet</FormBtn>
	          </div>
	        </form>
        </div>
			</div>
		)
	}
}

export default OneResult;