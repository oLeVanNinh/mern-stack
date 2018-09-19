import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import IssueList from './IssueList.jsx';

const NoMatch = () => <h1>Page Not Found</h1>;
const contentNode = document.getElementById('contents');

const RoutedApp = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={IssueList}/>
      <Route exact path="/nomatch" component={NoMatch} />
    </div>
  </BrowserRouter>
);
ReactDOM.render(<RoutedApp/> , contentNode);

if (module.hot) {
  module.hot.accept();
}
