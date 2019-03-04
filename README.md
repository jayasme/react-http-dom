# react-http-dom

React DOMs for HTTP/HTTPS protocols.

[![npm package](https://nodei.co/npm/react-http-dom.png)](https://nodei.co/npm/react-http-dom/)

## Introducing

`react-http-dom` is a `React` lib that allows you to use `React DOM` to implement HTTP/HTTPS protocols. It supports `GET`,`POST`,`PUT`,`DELETE`,`HEAD` these 5 methods.
This is a `Promise` free repository, if you do prefer `Promise`, I advise you to use `react-axios` which depends on the famous lib `axios` and implemented with `Promise`.

## Integration

Using Npm:

```
npm install react-http-dom
```

Or using Yarn:

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
  return (
    <HttpGet uri="https://foo.url/bar">
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

For idempotent methods(aka unsafe methods) like `POST`, `PUT` and `DELETE`, these methods are usually fired by some manual events, so we offer you the functions to let you call them at any moment you want. Instead, these methods don't recieve any props, you should pass the `uri`,`params` and `options` to the functions while you calling and those functions give you the result back through callbacks.

Example:

```javascript
import { HttpPost } from 'http-react-dom';

...

render() {
  ...

  return (
    <HttpPost>
      {({ post, upload }) => {
        const postData = (params) => {
          // Post data in body or x-www-form-urlencoded
          post({
            uri: "https://foo.url/bar",
            params,
            onResponse: data => {
              alert("Succeed!");
            },
            onError: error => {
              alert("Failed!");
            }
          })
        };

        const uploadData = params => {
          // Post form-data
          upload({
            uri: "https://foo.url/bar",
            params,
            onResponse: data => {
              alert("Succeed!");
            }, onError: error => {
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

### HOC

We offer HOC to let you reduce the stack of DOMs and make your code prettier, Here is what we do about the `GET` method:

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

export default withHttpGet({ uri: "https://foo.url/bar" })(Foo);

```

Every params you pass to the HOCs are completely the same as DOM components.

### All Supported Methods

| Method | DOM Component | Props                | Injected Props              | HOC Name       |
| ------ | ------------- | -------------------- | --------------------------- | -------------- |
| GET    | HttpGet       | uri, options         | loading, data, error, retry | withHttpGet    |
| HEAD   | HttpHead      | uri, options         | loading, data, error, retry | withHttpHead   |
| POST   | HttpPost      | uri, params, options | post, upload                | withHttpPost   |
| PUT    | HttpPut       | uri, params, options | put, upload                 | withHttpPut    |
| DELETE | HttpDelete    | uri, options         | delete                      | withHttpDelete |

## License

MIT
