import paramsToQueryString from './paramsToQueryString';

const HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};
const defaultHeaders = {
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/json'
};


/**
 * This callback type is called `isBizSuccessCallback` and is displayed as a global symbol.
 *
 * @callback isBizSuccessCallback
 * @param {object} response
 * @returns {boolean} - is business success: true - success, false - failure
 */

/**
 * @param {string} url - http request url
 * @param {object} options - ajax option object
 * @param {string} [options.method='GET'] - http request method: 'GET', 'POST', 'PUT', 'DELETE'
 * @param {object} [options.data] - http request parameters: { [parameterName]: parameterValue }
 * @param {object} [options.headers] - http request headers: { [headerName]: headerValue }
 * @param {checkBizFailureCallback} [options.isBizSuccess] - should check business failure, if failed throw exception as requrest failure
 */
function sendImpl(url, options = {}) {
    const method = HttpMethod[options.method] || HttpMethod.GET;
    const headers = Object.assign({}, defaultHeaders, options.headers);
    const data = options.data;
    const isBizSuccess = options.isBizSuccess;

    if (method === HttpMethod.GET && data) {
        if (url.indexOf('?') >= 0) {
            url += '&' + paramsToQueryString(data);
        } else {
            url += '?' + paramsToQueryString(data);
        }
    }
    let requestBody;
    if (method !== HttpMethod.GET && data) {
        requestBody = JSON.stringify(data);
    }

    return fetch(url, {
        method,
        headers,
        credentials: 'include',
        body: requestBody
    }).then(function(response) {
        if (response.status !== 200) {
            throw new Error('http status is not ok');
        }
        if (response.body) {
            return response.json();
        } else {
            return null;
        }
    }).then(function(responseBodyJson) {
        if (responseBodyJson) {
            if (isBizSuccess) {
                if (isBizSuccess(responseBodyJson) !== true) {
                    throw new Error('Unsuccessful api call');
                }
            }
        }
        return responseBodyJson;
    });
}

const ApiSender = {
    send(url, options) {
        return sendImpl(url, options);
    }
};

export default ApiSender;
