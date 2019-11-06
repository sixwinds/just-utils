# Document

This is a simple util library with **AJAX** features.

## ApiSender

Simple encapsulation of web api fetch.

+ Append request parameters as query string when do GET request.
+ Support request method: GET, POST, PUT, DELETE. Default method is GET.
+ Default request `Content-Type` is `application/json`.
+ All failed request situation are thrown as exception/error. Situation of failures include:
  + Net work exception.
  + Http status code is not 200.
  + Response json parse error.
  + Response json which is business failure.

### Usage
`const resPromise = ApiSender.send(url, options)`

- param {string} url - http request url
- param {object} options - ajax option object
- param {string} [options.method='GET'] - http request method: 'GET', 'POST', 'PUT', 'DELETE'
- param {object} [options.data] - http request parameters: { [parameterName]: parameterValue }
- param {object} [options.headers] - http request headers: { [headerName]: headerValue }
- param {checkBizFailureCallback} [options.isBizSuccess] - should check business failure, if failed throw exception as requrest failure
- return {Promise} Promise object represents response body json object

For example

#### request without parameters
```js
import { ApiSender } from 'just-utils';

// default method is GET
ApiSender.send('http://demo/api/get').then(function(resultJson) {
  // do something with resultJson
});
```

#### request with paramters
```js
import { ApiSender } from 'just-utils';

ApiSender.send('http://demo/api/getpostputdelete', {
  method: 'POST' // also 'GET', 'PUT', 'DELETE',
  data: {
    paramName: 'paramValue'
  }
}).then(function(resultJson) {
  // do something with resultJson
});
```

#### exception/error handling
```js
import { ApiSender } from 'just-utils';

ApiSender.send('http://demo/api/getpostputdelete', {
  method: 'POST' // also 'GET', 'PUT', 'DELETE',
  data: {
    paramName: 'paramValue'
  }
}).then(function(resultJson) {
  // do something with resultJson
}).catch(function(error) {
  // do something with error
})
```

#### make business failures as error
```js
import { ApiSender } from 'just-utils';

ApiSender.send('http://demo/api/getpostputdelete', {
  method: 'POST' // also 'GET', 'PUT', 'DELETE',
  data: {
    paramName: 'paramValue'
  },
  isBizSuccess: function(resultJson) {
    return resultJson.success === true ? true : false;
  }
}).then(function(resultJson) {
  // do something with resultJson
}).catch(function(error) {
  // if isBizSuccess returns false, catch callback will be invoke
  // do something with error
})
```

#### set request headers
```js
import { ApiSender } from 'just-utils';

// default method is GET
ApiSender.send('http://demo/api/get', {
  headers: {
    'x-csrf-token': 'xQOAK6ZlIOBsQTnUaSb3'
  }
}).then(function(resultJson) {
  // do something with resultJson
});
```

#### Async/Await
```js
async function serviceMethod() {
  const resultJson = await ApiSender.send('http://demo/api/getbyawait');
  // do something with resultJson
}
```



special notice for errors and so on.