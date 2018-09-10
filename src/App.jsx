const contentNode = document.getElementById('contents');
class IssueRow extends  React.Component {
  render() {
    const issue = this.props.issue;
    return(
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.completionDate ? issue.completionDate.toDateString() : ""}</td>
        <td>{issue.title}</td>
      </tr>
    )
  }
}

class IssueFilter extends React.Component {
  render() {
    return (
      <div>This is place holder for Issue Filter</div>
    )
  }
}

class IssueTable extends React.Component {
  render() {
    const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue}/>)
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Completion Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>{issueRows}</tbody>
      </table>
    )
  }
}

class IsseAdd extends  React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    });
    form.owner.value="";
    form.title.value="";
  }
  render() {
    return(
      <div>
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="owner" placeholder="Owner"/>
          <input type="text" name="title" placeholder="Tiltle"/>
          <button>Add</button>
        </form>
      </div>
    )
  }
}

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
        <IsseAdd createIssue={this.createIssue}/>
      </div>
    );
  }
}

ReactDOM.render(<IssueList/> , contentNode);