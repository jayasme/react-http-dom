import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Query from './base/query';

class HttpGet extends PureComponent {
  render() {
    const { children, uri, options } = this.props;
    return (
      <Query uri={uri} method="GET" options={options}>
        {({ loading, data, error, retry }) =>
          children({ loading, data, error, retry })
        }
      </Query>
    );
  }
}

HttpGet.defaultProps = {
  options: {},
};

HttpGet.propTypes = {
  uri: PropTypes.string.isRequired,
  children: PropTypes.elementType({
    data: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.object,
    retry: PropTypes.func,
  }).isRequired,
  options: PropTypes.object,
};

const withHttpGet = ({ uri, options }) => WrappedComponent => {
  const EnhancedComponent = () => (
    <HttpGet uri={uri} options={options}>
      {props => <WrappedComponent {...props} />}
    </HttpGet>
  );

  return EnhancedComponent;
};

export { HttpGet, withHttpGet };
