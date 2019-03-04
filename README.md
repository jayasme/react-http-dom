# react-http-dom

React DOMs for HTTP/HTTPS protocols.

## Introducing

`react-http-dom` is a `ReactJS` lib that allows you to use `React DOM` to implement HTTP/HTTPS protocols. It supports `GET`,`POST`,`PUT`,`DELETE`,`HEAD` these 5 methods.

## Integration

Using Npm:

```
npm install react-http-dom
```

Or using Yarn

```
yarn add react-http-dom
```

## How to use

### Read-Only Methods / Safe Methods

For read-only methods(aka safe methods) like `GET` and `HEAD`, you need to pass `uri` and `options` to the DOM. The data and status we offered are returned in the render function of the DOM, `loading` to let you know the latest loading status of the request, `error` to let you know wether the request was failed with some information, `data` to pass you the accurate data that you requested from the request, `retry` to let you send the request once more if you'd like to.

Example:

```javascript
import { HttpGet } from 'http-react-dom';

...

render() {
  ...

  return (
    <HttpGet uri="https://foo.url/bar">
    {({loading, error, data, retry}) => {
      if (error) {
        return (
          <div>Oops! We had an error!</div>
          <button onClick={retry}>Retry!</button>
        );
      }

      if (loading || !data) {
        return (<div>Loading...</div>);
      }

      // render your UI via data
      return data;
    }}
    </HttpGet>
  );
}

```

### Idempotent Methods / Unsafe Methods

For idempotent methods(aka unsafe methods) like `POST`, `PUT` and `DELETE`, these methods are usually fired by some manual events, so we offer you the functions to let you call them at any moment anytime you want. Oppsitely, these methods don't recive any props, you should pass the `uri`,`params` and `options` to the functions when you called and those functions give you the result back through callbacks.

Example:

```javascript
import { HttpPost } from 'http-react-dom';

...

render() {
  ...

  return (
    <HttpPost>
      {({post, upload}) => {
        const postData = (params) => {
          // Post data in body or x-www-form-urlencoded
          post({
            uri: "https://foo.url/bar",
            params,
            onResponse: (data) => {
              alert("Succeed!");
            },
            onError: (error) => {
              alert("Failed!");
            }
          })
        };

        const uploadData = (params) => {
          // Post form-data
          upload({
            uri: "https://foo.url/bar",
            params,
            onResponse: (data) => {
              alert("Succeed!");
            }, onError: (error) => {
              alert("Failed!");
            }
          });
        };

        return (
          <div>
            <button onClick={() => postData({ key: 'value' })}>Post</button>
            <button onClick={() => uploadData({ file: file.getReadStream() })}>Upload</button>
          </div>
        );
      }}
    </HttpPost>
  );
}

```

## License

MIT
