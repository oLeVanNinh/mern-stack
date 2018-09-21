import React from 'react';
import { Link } from 'react-router-dom';

class IssueEdit extends React.Component {
  render() {
    const params = this.props.match.params.id;
    return(
      <div>
        <h1>THis is Issue Edit for {params}</h1>
        <Link to="/" >Back to Issue List</Link>
      </div>
    )
  }
}

export default IssueEdit;