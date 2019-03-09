import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Mutation from './base/mutation';

class HttpPatch extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Mutation>
        {({ mutate }) => {
          const sendPatchData = ({
            uri,
            data,
            options,
            onResponse,
            onError,
          }) => {
            mutate({
              uri,
              method: 'PATCH',
              options: {
                ...options,
                body: data,
              },
              onResponse,
              onError,
            });
          };

          const sendPatchJson = ({
            uri,
            json,
            options,
            onResponse,
            onError,
          }) => {
            mutate({
              uri,
              method: 'PATCH',
              options: {
                ...options,
                json,
              },
              onResponse,
              onError,
            });
          };

          const sendPatchForm = ({
            uri,
            form,
            options = {},
            onResponse,
            onError,
          }) => {
            const isFormData = Object.values(form).find(
              value => typeof value === 'object',
            );

            const coptions = isFormData
              ? {
                  ...options,
                  headers: {
                    ...options.headers,
                    'content-type': 'multipart/form-data',
                    'transfer-encoding': 'chunked',
                  },
                  form,
                }
              : {
                  ...options,
                  headers: {
                    ...options.headers,
                    'content-type': 'application/x-www-form-urlencoded',
                  },
                  form,
                };

            mutate({
              uri,
              method: 'PATCH',
              options: coptions,
              onResponse,
              onError,
            });
          };

          return children({
            sendPatchData,
            sendPatchJson,
            sendPatchForm,
          });
        }}
      </Mutation>
    );
  }
}

HttpPatch.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

const withHttpPatch = () => WrappedComponent => {
  const EnhancedComponent = () => (
    <HttpPatch>
      {({ sendPatchData, sendPatchJson, sendPatchForm }) => (
        <WrappedComponent
          sendPatchData={sendPatchData}
          sendPatchJson={sendPatchJson}
          sendPatchForm={sendPatchForm}
        />
      )}
    </HttpPatch>
  );

  return EnhancedComponent;
};

export { HttpPatch, withHttpPatch };
