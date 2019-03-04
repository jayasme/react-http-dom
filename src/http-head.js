import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Query from './base/query';

class HttpHead extends PureComponent {
  render() {
    const { children, uri, options } = this.props;
    return (
      <Query uri={uri} method="HEAD" options={options}>
        {({ loading, data, error, retry }) =>
          children({ loading, data, error, retry })
        }
      </Query>
    );
  }
}

HttpHead.defaultProps = {
  options: {},
};

HttpHead.propTypes = {
  uri: PropTypes.string.isRequired,
  children: PropTypes.elementType({
    data: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.object,
    retry: PropTypes.func,
  }).isRequired,
  options: PropTypes.object,
};

const withHttpHead = ({ uri, options }) => WrappedComponent => {
  const EnhancedComponent = () => (
    <HttpHead uri={uri} options={options}>
      {props => <WrappedComponent {...props} />}
    </HttpHead>
  );

  return EnhancedComponent;
};

export { HttpHead, withHttpHead };
