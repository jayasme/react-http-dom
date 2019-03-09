# react-http-dom

React DOMs for HTTP/HTTPS protocols.

[![npm package](https://nodei.co/npm/react-http-dom.png)](https://nodei.co/npm/react-http-dom/)

## Introducing

`react-http-dom` is a `React` lib that allows you to use `React DOM` to implement HTTP/HTTPS protocols. It supports `GET`,`HEAD`,`POST`,`PUT`,`PATCH`,`DELETE`, these 6 methods.
This is a `Promise` free repository, if you do prefer `Promise`, I personally advise you to use `react-axios` which depends on the famous lib `axios` with `Promise`.

**WARNING: This lib is still under devlopment and this is not a lib for `React Native`.**

## Integration

Using Npm:

```
npm install --save react-http-dom
```

Or using Yarn:

```
yarn add react-http-dom
```

## How to use

### Read-Only Methods / Safe Methods

For read-only methods(aka safe methods) like `GET` and `HEAD`, you need to pass `uri` and `options` to the DOM. The data and status are injected into the render function of the DOM's child, `loading` to let you know the latest loading status of the request, `error` to let you know whether the request was failed with some information, `data` to pass you the accurate result that you requested from the uri, `retry` to let you send the request once more if you'd like to.

Example:

```javascript
import { HttpGet } from 'http-react-dom';

...

render() {
  return (
    <HttpGet uri="https://foo.url/bar?query=query">
      {({ loading, error, data, retry }) => {
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

For idempotent methods(aka unsafe methods) like `POST`, `PUT`, `PATCH` and `DELETE`, these methods are usually fired by some manual events, so it offers you the injected functions to let you call them at any moment you want. Instead, these methods don't recieve any props, so you must pass the `uri`, `params` and `options` to the functions while you calling them and those functions give you the results back through their callbacks.

Example:

```javascript
import { HttpPost } from 'http-react-dom';

...

render() {
  ...

  return (
    <HttpPost>
      {({ sendPostJson, sendPostForm }) => {
        const onSendPostJson = json => {
          // Post Json
          sendPostJson({
            uri: "https://foo.url/bar",
            json,
            onResponse: data => {
              alert("Succeed!");
            },
            onError: error => {
              alert("Failed!");
            }
          })
        };

        const onSendPostForm = form => {
          // Post form-data or x-www-form-urlencoded
          sendPostForm({
            uri: "https://foo.url/bar",
            form,
            onResponse: data => {
              alert("Succeed!");
            }, onError: error => {
              alert("Failed!");
            }
          });
        };

        return (
          <div>
            <button onClick={() => onSendPostJson({ key: 'value' })}>Post</button>
            <button onClick={() => onSendPostForm({ key: 'value' })}>Upload</button>
          </div>
        );
      }}
    </HttpPost>
  );
}

```

### HOC

`react-http-dom` offers HOC to let you reduce the stack of DOMs and make your code prettier, Here is what we do about the `GET` method:

```javascript
import { withHttpGet } from 'http-react-dom';

...

class Foo extends Component {
  ...

  render() {
    const { loading, error, data, retry } = this.props;

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
  }
}

export default withHttpGet({ uri: "https://foo.url/bar?query=query" })(Foo);

```

Every param you pass to the HOCs is completely the same as DOM components.

For more examples, please refer to [Examples](/examples 'Examples').

### All Supported Methods

| Method | DOM Name   | HOC Name       | Props                                                                                                                                                                             | Injected Props                                |
| ------ | ---------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| GET    | HttpGet    | withHttpGet    | uri, options                                                                                                                                                                      | loading, data, error, retry({ uri, options }) |
| HEAD   | HttpHead   | withHttpHead   | uri, options                                                                                                                                                                      | loading, data, error, retry({ uri, options }) |
| POST   | HttpPost   | withHttpPost   | sendPostData({ uri, data, options, onResponse, onError }), sendPostjSON({ uri, json, options, onResponse, onError }),sendPostForm({ uri, form, options, onResponse, onError })    |                                               |
| PUT    | HttpPut    | withHttpPut    | sendPutData({ uri, data, options, onResponse, onError }), sendPutjSON({ uri, json, options, onResponse, onError }),sendPutForm({ uri, form, options, onResponse, onError })       |                                               |
| PATCH  | HttpPatch  | withHttpPatch  | sendPatchData({ uri, data, options, onResponse, onError }), sendPatchjSON({ uri, json, options, onResponse, onError }),sendPatchForm({ uri, form, options, onResponse, onError }) |                                               |
| DELETE | HttpDelete | withHttpDelete | sendDelete({ uri, options, onResponse, onError })                                                                                                                                 |                                               |

## Troubleshootings

- Q: Why do I encounter an error says "Uncaught Error: Cannot find module 'net'/'fs'/'tls'"?
- A: Due to browsers don't support some functions in Node.js, so you'd better ignore them, in order to do this please add the following node to your `webpack.config.js`:

```javascript
node: {
  fs: 'empty',
  net: 'empty',
  tls: 'empty',
},
```

## License

MIT
