import React from "react";
import "./InvoiceModal.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormBtn } from "../Form";

class InvoiceModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
	render() {
    return (
			<div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
			<form>
				<div className="form-group">
			    <label htmlFor="company-name">Company Name</label>
			    <input 
			    	type="text" 
			    	className="form-control" 
			    	name="companyName"
			    	onChange={this.props.handleInputChange}
			    	placeholder="Enter your company name here"/>
			  </div>
			  <div className="form-group">
			    <label htmlFor="invoice-number">Invoice Number</label>
			    <input 
			    	className="form-control"
			    	name="invoiceNumber"
			    	onChange={this.props.handleInputChange} 
			    	placeholder="Ex: 232232"/>
			  </div>
			  <div className="form-group">
			    <label htmlFor="vendor-number">Vendor Number</label>
			    <input 
			    	className="form-control"
			    	name="vendorNumber"
			    	onChange={this.props.handleInputChange}
			    	placeholder="Ex: SKU009"/>
			  </div>
				<div className="form-group">
			    <label htmlFor="item-number">Item Number</label>
				<input 
			    	className="form-control"
			    	name="itemNumber"
			    	onChange={this.props.handleInputChange}
			    	placeholder="Ex: 000045"/>
			  </div>
				<div className="form-group">
			    <label htmlFor="credit-number">Credit Number</label>
				<input 
			    	className="form-control"
			    	name="creditNumber"
			    	onChange={this.props.handleInputChange}
			    	placeholder="Ex: 000045"/>
			  </div>
				<div className="form-group">
			    <label htmlFor="end-year">Debit Number</label>
				<input 
			    	className="form-control"
			    	name="debitNumber"
			    	onChange={this.props.handleInputChange}
			    	placeholder="Ex: 000045"/>
			  </div>
				<div className="form-group">
			    <label htmlFor="total-year">Total Balance</label>
				<input 
			    	className="form-control"
			    	name="totalBalance"
			    	onChange={this.props.handleInputChange}
			    	placeholder="What kind of format should we use?"/>
			  </div>

				<div className="form-group">
			    <label htmlFor="due-date">Due Date</label>
				<input 
			    	className="form-control"
			    	name="dueDate"
			    	onChange={this.props.handleInputChange}
			    	placeholder="Decide data format"/>
			  </div>
				<div className="form-group">
			    <label htmlFor="amt-past-due">Amount Past Due</label>
				<input 
			    	className="form-control"
			    	name="amountPastDue"
			    	onChange={this.props.handleInputChange}
			    	placeholder="Decide date format"/>
			  </div>
				<div className="form-group">
			    <label htmlFor="dept-name">Department Name</label>
				<input 
			    	className="form-control"
			    	name="departmentName"
			    	onChange={this.props.handleInputChange}
			    	placeholder="Enter a department name"/>
			  </div>
				<div className="form-group">
			    <label htmlFor="location-name">Location Name</label>
				<input 
			    	className="form-control"
			    	name="locationName"
			    	onChange={this.props.handleInputChange}
			    	placeholder="Enter a location name"/>
			  </div>
				<div className="form-group">
			    <label htmlFor="representative">Representative</label>
				<input 
			    	className="form-control"
			    	name="representativeName"
			    	onChange={this.props.handleInputChange}
			    	placeholder="Enter a representative"/>
			  </div>
				
			  <FormBtn onClick={this.props.handleFormSubmit}>Submit</FormBtn>
			</form>
	    </ModalBody>
			<ModalFooter>
	    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default InvoiceModal;