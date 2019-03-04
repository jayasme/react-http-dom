import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Mutation from './base/mutation';

class HttpDelete extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Mutation>
        {({ mutate }) => {
          const sendDeleteRequest = (uri, options, onResponse, onError) => {
            mutate({
              uri,
              method: 'DELETE',
              ...options,
              onResponse,
              onError,
            });
          };

          return children({
            delete: sendDeleteRequest,
          });
        }}
      </Mutation>
    );
  }
}

const withHttpDelete = () => WrappedComponent => {
  const EnhancedComponent = () => (
    <HttpDelete>
      {({ sendDelete }) => <WrappedComponent delete={sendDelete} />}
    </HttpDelete>
  );

  return EnhancedComponent;
};

HttpDelete.propTypes = {
  children: PropTypes.elementType({
    sendDelete: PropTypes.elementType({
      uri: PropTypes.string,
      options: PropTypes.object,
      onResponse: PropTypes.func,
      onError: PropTypes.func,
    }),
  }).isRequired,
};

export { HttpDelete, withHttpDelete };
