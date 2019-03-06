import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => (
  <div>
    <h1>Welcome to react-http-dom examples.</h1>
    <div>Please click the following links to test</div>
    <hr />
    <Link to="/http-get">HttpGet</Link>
    <Link to="/with-http-get">withHttpGet</Link>
  </div>
);

export default WelcomePage;
