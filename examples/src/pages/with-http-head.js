import React from 'react';
import PropTypes from 'prop-types';

import { withHttpHead } from '../../../lib';

const WithHttpHeadPage = ({ loading, data, error }) => {
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
};

WithHttpHeadPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

export default withHttpHead({
  uri: 'http://httpbin.org/head',
})(WithHttpHeadPage);
