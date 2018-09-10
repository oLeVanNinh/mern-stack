const contentNode = document.getElementById('contents');
const issues = [
  {
    id: 1, status: 'Open', owner: 'Ravan', created: new Date('2018-08-15'),
    effort: 5, completionDate: undefined, title: 'Error in console when clicking Add'
  },
  {
    id: 2, status: 'Assigned', owner: 'Eddied', created: new Date('2018-08-13'),
    effort: 15, completionDate: new Date('2018-08-23'), title: 'Missing bottom border on panel'
  },
]
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
    this.state = {issues: issues};
    this.createIssue = this.createIssue.bind(this);
  }
  
  createIssue(newIssue) {
    const newIssues = this.state.issues.slice();
    newIssue.id = this.state.issues.length + 1;
    newIssue.effort = Math.floor(Math.random() * Math.floor(20));
    newIssues.push(newIssue);
    this.setState({ issues: newIssues })
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