import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Mutation from './base/mutation';

class HttpPut extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Mutation>
        {({ mutate }) => {
          const sendPutData = ({ uri, data, options, onResponse, onError }) => {
            mutate({
              uri,
              method: 'PUT',
              options: {
                ...options,
                body: data,
              },
              onResponse,
              onError,
            });
          };

          const sendPutJson = ({ uri, json, options, onResponse, onError }) => {
            mutate({
              uri,
              method: 'PUT',
              options: {
                ...options,
                json,
              },
              onResponse,
              onError,
            });
          };

          const sendPutForm = ({
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
              method: 'PUT',
              options: coptions,
              onResponse,
              onError,
            });
          };

          return children({
            sendPutData,
            sendPutJson,
            sendPutForm,
          });
        }}
      </Mutation>
    );
  }
}

HttpPut.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

const withHttpPut = () => WrappedComponent => {
  const EnhancedComponent = () => (
    <HttpPut>
      {({ sendPutData, sendPutJson, sendPutForm }) => (
        <WrappedComponent
          sendPutData={sendPutData}
          sendPutJson={sendPutJson}
          sendPutForm={sendPutForm}
        />
      )}
    </HttpPut>
  );

  return EnhancedComponent;
};

export { HttpPut, withHttpPut };
