import React from 'react';
import { Table } from 'reactstrap';

export default class Example extends React.Component {
    state  = {
        transactions: this.props.transactions
    }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Invoice #</th>
            <th>Vendor #</th>
            <th>Item #</th>
            <th>Credit #</th>
            <th>Debit #</th>
            <th>Total Balance</th>
            <th>Due Date</th>
            <th>Amount Past Due</th>
            <th>Dept. Name</th>
            <th>Location Name</th>
            <th>Representative</th>
          </tr>
        </thead>
        <tbody>
        {!this.state.transactions ? (
          <tr>
            <td>no transactions</td>
          </tr>
        ): (
            this.state.transactions.map(Transaction => {
          return (
            <tr>
              <td>{Transaction.companyName}</td>
              <td>{Transaction.invoiceNumber}</td>
              <td>{Transaction.vendorNumber}</td>
              <td>{Transaction.itemNumber}</td>
              <td>{Transaction.creditNumber}</td>
              <td>{Transaction.debitNumber}</td>
              <td>{Transaction.totalBalance}</td>
              <td>{Transaction.dueDate}</td>
              <td>{Transaction.amountPastDue}</td>
              <td>{Transaction.departmentName}</td>
              <td>{Transaction.locationName}</td>
              <td>{Transaction.representativeName}</td>
            </tr>
          );
        })
        )}
        
        </tbody>
      </Table>
    );
  }
}
