import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => (
  <div>
    <h1>Welcome to the react-http-dom examples.</h1>
    <div>
      Please click the following links to test variety of the components.
    </div>
    <hr />
    <Link to="/http-get">Test HttpGet</Link>
    <br />
    <Link to="/with-http-get">Test withHttpGet</Link>
    <br />
    <Link to="/http-head">Test HttpHead</Link>
    <br />
    <Link to="/with-http-head">Test withHttpHead</Link>
    <br />
    <Link to="/http-post">Test HttpPost</Link>
    <br />
    <Link to="/with-http-post">Test withHttpPost</Link>
    <br />
    <Link to="/http-put">Test HttpPut</Link>
    <br />
    <Link to="/with-http-put">Test withHttpPut</Link>
    <br />
    <Link to="/http-patch">Test HttpPatch</Link>
    <br />
    <Link to="/with-http-patch">Test withHttpPatch</Link>
    <br />
    <Link to="/http-delete">Test HttpDelete</Link>
    <br />
    <Link to="/with-http-delete">Test withHttpDelete</Link>
  </div>
);

export default WelcomePage;
