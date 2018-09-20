import React from 'react';
import { Link } from 'react-router-dom';

class IssueEdit extends React.Component {
  render() {
    return(
      <div>
        <h1>THis is Issue Edit</h1>
        <Link to="/" >Back to Issue List</Link>
      </div>
    )
  }
}

export default IssueEdit;