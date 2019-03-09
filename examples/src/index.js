import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import { HashRouter, Switch, Route } from 'react-router-dom';

import WelcomePage from './pages/weicome';
import HttpGetPage from './pages/http-get';
import WithHttpGetPage from './pages/with-http-get';
import HttpHeadPage from './pages/http-head';
import WithHttpHeadPage from './pages/with-http-head';
import HttpPostPage from './pages/http-post';
import WithHttpPostPage from './pages/with-http-post';
import HttpPutPage from './pages/http-put';
import WithHttpPutPage from './pages/with-http-put';
import HttpPatchPage from './pages/http-patch';
import WithHttpPatchPage from './pages/with-http-patch';
import HttpDeletePage from './pages/http-delete';
import WithHttpDeletePage from './pages/with-http-delete';

const Router = () => (
  <HashRouter basename="/">
    <Switch>
      <Route exact name="welcome" path="/" component={WelcomePage} />
      <Route exact name="http-get" path="/http-get" component={HttpGetPage} />
      <Route
        exact
        name="with-http-get"
        path="/with-http-get"
        component={WithHttpGetPage}
      />
      <Route
        exact
        name="http-head"
        path="/http-head"
        component={HttpHeadPage}
      />
      <Route
        exact
        name="with-http-head"
        path="/with-http-head"
        component={WithHttpHeadPage}
      />
      <Route
        exact
        name="http-post"
        path="/http-post"
        component={HttpPostPage}
      />
      <Route
        exact
        name="with-http-post"
        path="/with-http-post"
        component={WithHttpPostPage}
      />
      <Route exact name="http-put" path="/http-put" component={HttpPutPage} />
      <Route
        exact
        name="with-http-put"
        path="/with-http-put"
        component={WithHttpPutPage}
      />
      <Route
        exact
        name="http-patch"
        path="/http-patch"
        component={HttpPatchPage}
      />
      <Route
        exact
        name="with-http-patch"
        path="/with-http-patch"
        component={WithHttpPatchPage}
      />
      <Route
        exact
        name="http-delete"
        path="/http-delete"
        component={HttpDeletePage}
      />
      <Route
        exact
        name="with-http-delete"
        path="/with-http-delete"
        component={WithHttpDeletePage}
      />
    </Switch>
  </HashRouter>
);

const App = () => <Router />;

export default hot(module)(App);

ReactDOM.render(<App />, document.getElementById('root'));
