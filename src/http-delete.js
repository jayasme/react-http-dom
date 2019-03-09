import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Mutation from './base/mutation';

class HttpDelete extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Mutation>
        {({ mutate }) => {
          const sendDelete = ({ uri, options, onResponse, onError }) => {
            mutate({
              uri,
              method: 'DELETE',
              ...options,
              onResponse,
              onError,
            });
          };

          return children({
            sendDelete,
          });
        }}
      </Mutation>
    );
  }
}

HttpDelete.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

const withHttpDelete = () => WrappedComponent => {
  const EnhancedComponent = () => (
    <HttpDelete>
      {({ sendDelete }) => <WrappedComponent sendDelete={sendDelete} />}
    </HttpDelete>
  );

  return EnhancedComponent;
};

export { HttpDelete, withHttpDelete };
