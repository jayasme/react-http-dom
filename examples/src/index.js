import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { HashRouter, Switch, Route } from 'react-router-dom';

import HttpGetPage from './pages/http-get';
import WithHttpGetPage from './pages/with-http-get';

const Router = () => (
  <HashRouter basename="/">
    <Switch>
      <Route exact name="http-get" path="/http-get" component={HttpGetPage} />
      <Route
        exact
        name="with-http-get"
        path="/with-http-get"
        component={WithHttpGetPage}
      />
    </Switch>
  </HashRouter>
);

const App = () => <Router />;

export default hot(module)(App);

ReactDOM.render(<App />, document.getElementById('root'));
