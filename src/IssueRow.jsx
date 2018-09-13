import React from 'react';

export default class IssueRow extends  React.Component {
  render() {
    const issue = this.props.issue;
    return(
      <tr>
        <td>{issue._id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.completionDate ? issue.completionDate.toDateString() : ""}</td>
        <td>{issue.title}</td>
      </tr>
    )
  }
};