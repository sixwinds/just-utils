# Document

This is a simple util library with **AJAX**, **Date Format** features.

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
```js
const resPromise = ApiSender.send(url, options)
```

- param {string} url - http request url.
- param {object} options - ajax option object.
- param {string} [options.method='GET'] - http request method: 'GET', 'POST', 'PUT', 'DELETE'.
- param {object} [options.data] - http request parameters: { [parameterName]: parameterValue }.
- param {object} [options.headers] - http request headers: { [headerName]: headerValue }.
- param {checkBizFailureCallback} [options.isBizSuccess] - should check business failure, if failed throw exception as requrest failure.
- return {Promise} Promise object represents response body json object.

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
  /* 
  eg: resultJson is 
    {
      success: true,
      errorCode: 0,
      errorMessage: '',
      payload: {}
    }
  */
  // do something with resultJson
}
```

## SimpleDateFormat

Date Formatter which just support pattern: yyyy|M|MM|d|dd|H|HH|m|mm|s|ss.

+ hour is 24-based.

### Usage
```js
const dateStr = SimpleDateFormat.format(new Date(), 'yyyy-MM-dd');
```

- param {(Date|number)} date - instance of Date or time number of Date.
- param {string} [pattern] - pattern string which includes： yyyy, M, MM, d, dd, H, HH, m, mm, s, ss.
- return {string} formatted date string.

For example
### patterns and result
```js
import { SimpleDateFormat as sdf } from 'just-utils';

const date = new Date(2019, 5, 5, 19, 9, 9 );
sdf.format(date); // '2019-06-05' default patter is yyyy-MM-dd
sdf.format(date, 'yyyy-M-d'); // '2019-6-5';
sdf.format(date, 'yyyy-MM-dd HH:mm:ss'); // '2019-06-05 19:09:09'
sdf.format(date, 'yyyy-M-d H:m:s'); // '2019-6-5 19:9:9'
```


special notice for errors and so on.