import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const NoMatch = () => <h1>Page Not Found</h1>;
const contentNode = document.getElementById('contents');

const RoutedApp = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={IssueList}/>
      <Route exact path="/nomatch" component={NoMatch} />
      <Route path="/issues/:id" component={IssueEdit} />
    </div>
  </BrowserRouter>
);
ReactDOM.render(<RoutedApp/> , contentNode);

if (module.hot) {
  module.hot.accept();
}
