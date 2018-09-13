import 'whatwg-fetch';
import React from 'react';
import IssueFilter from "./IssueFilter.jsx";
import IssueAdd from "./IssueAdd.jsx";
import IssueTable from './IssueTable.jsx';

class IssueList extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {issues: []};
    this.createIssue = this.createIssue.bind(this);
  }
  
  componentDidMount() {
    this.loadData();
  }
  
  loadData() {
    fetch('/api/issues')
      .then(response => response.json())
      .then(data => {
        console.log(`Total count of records ${data._metadata.total_count}`)
        data.records.forEach(issue => {
          issue.created = new Date(issue.created);
          if (issue.completionDate)
            issue.completionDate = new Date(issue.completionDate);
        });
        this.setState({issues: data.records})
      })
      .catch(err => console.log(err));
  }
  
  createIssue(newIssue) {
    fetch('/api/issues', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newIssue)
    })
      .then(response => response.json())
      .then(updatedIssue => {
        updatedIssue.created = new Date(updatedIssue.created);
        if (updatedIssue.completionDate)
          updatedIssue.completionDate = new Date(updatedIssue.completionDate);
        const newIssue = this.state.issues.concat(updatedIssue)
        this.setState({issues: newIssue})
      })
      .catch(err => console.log(`Error in sending data to server: ${err.message}`));
  }
  
  
  render() {
    return(
      <div>
        <h1>Issue Tracker</h1>
        <IssueFilter/>
        <hr/>
        <IssueTable issues={this.state.issues}/>
        <hr/>
        <IssueAdd createIssue={this.createIssue}/>
      </div>
    );
  }
}

export default IssueList;