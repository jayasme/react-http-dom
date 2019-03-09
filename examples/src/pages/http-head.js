import React from 'react';

import { HttpHead } from '../../../lib';

const HttpHeadPage = () => (
  <HttpHead uri="http://httpbin.org/head">
    {({ loading, data, error }) => {
      if (error) {
        return (
          <div>
            <div>Oops, we had an error!</div>
            <div>{`Error: ${error.message}`}</div>
          </div>
        );
      }

      if (loading || !data) {
        return <div>Loading...</div>;
      }

      return <pre>{data}</pre>;
    }}
  </HttpHead>
);

export default HttpHeadPage;
