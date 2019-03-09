# react-http-dom

React DOMs for HTTP/HTTPS protocols.

[![npm package](https://nodei.co/npm/react-http-dom.png)](https://nodei.co/npm/react-http-dom/)

For English descriptions click [HERE](/README.md 'HERE')。

## 介绍

`react-http-dom` 是一个允许让你使用 `React DOM` 来实现 HTTP/HTTPS 协议的 `React` 库。它支持 `GET`,`HEAD`,`POST`,`PUT`,`PATCH`,`DELETE` 这六种请求方法。
本库不支持 `Promise` ，如果你偏好使用 `Promise`，我个人建议你使用 `react-axios` ，这是一个基于著名的 `axios` 并支持 `Promise` 的库。

**警告：本库尚在开发中，并且不支持 `React Native`。**

## 继承

使用 Npm:

```
npm install --save react-http-dom
```

或使用 Yarn:

```
yarn add react-http-dom
```

## 如何使用

### 只读请求方式 / 安全请求方式

对于只读请求方式（又叫做安全请求方式），如 `GET` 和 `HEAD`，你只需要将 `uri` 和 `options` 属性传给 DOM。 之后数据和状态就会注入到 DOM 下层的 render 方法中， `loading` 属性可以告知你最新的请求状态，`error` 属性可以告知你请求是否失败并附带信息，`data` 属性将你请求 uri 的准确结果传给你, `retry` 可以让你再次发送请求。

举例：

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

### 幂等请求方法 / 非安全请求方法

对于幂等请求方法（又叫做非安全请求方法），如 `POST`, `PUT`, `PATCH` 和 `DELETE`，这些请求方法通常由手动事件触发，因此这些请求方法会提供注入函数让你随时可以进行调用。另外，这些请求方法不接受任何属性外来，因此你必须将 `uri`, `params` 和 `options` 这些信息在调用注入函数时传入，结果将会由这些函数提供的回调函数返回。

举例：

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

`react-http-dom` 提供 HOC 来让你缩减 DOM 的层级栈并让你的代码更美观，这里我们使用 `GET` 请求方法来举例：

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

所有需要传给 HOC 的属性与普通 DOM 组件完全一致。

更多例子请参考[这里](/examples '这里')。

### 所有支持的请求方法

| 请求方法 | DOM 名称   | HOC 名称       | 属性                                                                                                                                                                              | 注入属性                                      |
| -------- | ---------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| GET      | HttpGet    | withHttpGet    | uri, options                                                                                                                                                                      | loading, data, error, retry({ uri, options }) |
| HEAD     | HttpHead   | withHttpHead   | uri, options                                                                                                                                                                      | loading, data, error, retry({ uri, options }) |
| POST     | HttpPost   | withHttpPost   | sendPostData({ uri, data, options, onResponse, onError }), sendPostjSON({ uri, json, options, onResponse, onError }),sendPostForm({ uri, form, options, onResponse, onError })    |                                               |
| PUT      | HttpPut    | withHttpPut    | sendPutData({ uri, data, options, onResponse, onError }), sendPutjSON({ uri, json, options, onResponse, onError }),sendPutForm({ uri, form, options, onResponse, onError })       |                                               |
| PATCH    | HttpPatch  | withHttpPatch  | sendPatchData({ uri, data, options, onResponse, onError }), sendPatchjSON({ uri, json, options, onResponse, onError }),sendPatchForm({ uri, form, options, onResponse, onError }) |                                               |
| DELETE   | HttpDelete | withHttpDelete | sendDelete({ uri, options, onResponse, onError })                                                                                                                                 |                                               |

## 疑难问题

- 问：为什么我遇到了错误说“Uncaught Error: Cannot find module 'net'/'fs'/'tls'”？
- 答: 由于浏览器并不支持 Node.js 中的某些功能，因此你需要忽略它们，请将下面的 node 添加到你的 `webpack.config.js` 中。

```javascript
node: {
  fs: 'empty',
  net: 'empty',
  tls: 'empty',
},
```

## 授权

MIT
