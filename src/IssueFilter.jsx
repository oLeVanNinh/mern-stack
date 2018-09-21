import React from 'react';
import { Link } from 'react-router-dom';

class IssueFilter extends React.Component {
  render() {
    const Separator = () => <span> | </span>;
    return (
      <div>
        <Link to='/'>All Issues</Link>
        <Separator/>
        <Link to="/api/issues?status=Open">Open</Link>
        <Separator/>
        <Link to={{pathname: 'issues', query: {status: 'Assigned'}}}>Assigned Issues</Link>
      </div>
    )
  }
}

export default IssueFilter;