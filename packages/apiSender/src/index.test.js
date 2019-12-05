// libs
const fetchMock = require('fetch-mock');
// src
import ApiSender from './index';

/* eslint-disable */
describe('ApiSender', function() {
    describe('test first parameter[url]', function() {
        afterEach(function() {
            fetchMock.reset();
        });
        test('first parameter is passed', function(done) {
            const url = 'http://just-utils/test/apisender/get';
            fetchMock.get(url, 200);
            ApiSender.send(url).then(function() {
                done();
            });
        });
        
        test('first parameter is not passed', function() {
            try {
                ApiSender.send();
            } catch (error) {
                expect(error.name).toBe('TypeError');
            }
        });

        test('first parameter is passed with query string', function() {
            const url = 'http://just-utils/test/apisender/get';
            fetchMock.get(url, 200, {
                query: { qs: 'true' }
            });
            ApiSender.send(url + '?qs=true');
            expect(fetchMock.called(url, {
                method: 'GET',
                query: { qs: 'true' }
            })).toBe(true);
        });
    });

    describe('test GET request', function() {
        afterEach(function() {
            fetchMock.reset();
        });

        test('GET request without data', function() {
            const url = 'http://just-utils/test/apisender/get';

            fetchMock.get(url, 200);
            ApiSender.send(url, { method: 'GET' });
            expect(fetchMock.called(url, {
                method: 'GET'
            })).toBe(true);
        });

        test('GET request with empty-value data', function() {
            const url = 'http://just-utils/test/apisender/get';

            fetchMock.get(url, 200, {
                query: { name3: 'value3' }
            });
            ApiSender.send(url, {
                method: 'GET',
                data: {
                    name1: undefined,
                    name2: null,
                    name3: 'value3'
                }
            });
            expect(fetchMock.called(url, {
                method: 'GET',
                query: { name3: 'value3' }
            })).toBe(true);
        });

        test('append data as query string of GET request', function() {
            const data = {
                name1: 'value1',
                name2: 'value2'
            };
            const url = 'http://just-utils/test/apisender/get';

            fetchMock.get(url, 200, { query: data });
            ApiSender.send(url, {
                method: 'GET',
                data
            });
            expect(fetchMock.called(url, {
                method: 'GET',
                query: data
            })).toBe(true);
        });

        test('append data as query string of GET request with query string', function() {
            const data = {
                name3: 'value3',
                name2: 'value2'
            };
            const url = 'http://just-utils/test/apisender/get';
            fetchMock.get(url, 200, {
                query: {
                    name1: 'value1',
                    name2: data.name2,
                    name3: data.name3
                }
            });
            ApiSender.send(url + '?name1=value1', {
                method: 'GET',
                data
            });
            expect(fetchMock.called(url, {
                method: 'GET',
                query: {
                    name1: 'value1',
                    name2: data.name2,
                    name3: data.name3
                }
            })).toBe(true);
        });
    });

    describe('test not GET request', function() {
        afterEach(function() {
            fetchMock.reset();
        });

        test('not append data as query string of POST request', function() {
            const data = {
                name1: 'value1',
                name2: 'value2'
            };
            const url = 'http://just-utils/test/apisender/post';
            fetchMock.post(url, 200);
            ApiSender.send(url, {
                method: 'POST',
                data
            });
            expect(fetchMock.lastUrl(fetchMock.MATCHED)).toBe(url);
        });

        test('POST request with data', function() {
            const data = {
                name1: 'value1',
                name2: 'value2'
            };
            const url = 'http://just-utils/test/apisender/post';
            fetchMock.post(url, 200);
            ApiSender.send(url, {
                method: 'POST',
                data
            });
            expect(fetchMock.called(url, {
                method: 'POST',
                body: data
            })).toBe(true);
        });

        test('PUT request with data', function() {
            const data = {
                name1: 'value1',
                name2: 'value2'
            };
            const url = 'http://just-utils/test/apisender/put';
            fetchMock.put(url, 200);
            ApiSender.send(url, {
                method: 'PUT',
                data
            });
            expect(fetchMock.called(url, {
                method: 'PUT',
                body: data
            })).toBe(true);
        });
        test('DELETE request with data', function() {
            const data = {
                name1: 'value1',
                name2: 'value2'
            };
            const url = 'http://just-utils/test/apisender/delete';
            fetchMock.delete(url, 200);
            ApiSender.send(url, {
                method: 'DELETE',
                data
            });
            expect(fetchMock.called(url, {
                method: 'DELETE',
                body: data
            })).toBe(true);
        });
    });

    describe('test options.isBizSuccess callback', function() {
        afterEach(function() {
            fetchMock.reset();
        });
        
        test('without isBizSuccess', function(done) {
            const url = 'http://just-utils/test/apisender/get';
            const responseJson = {
                success: true,
                errorCode: 0,
                errorMessage: '',
                payload: {}
            };
            fetchMock.get(url, responseJson);
            ApiSender.send(url, {
                method: 'GET'
            }).then(function(resultJson) {
                expect(resultJson).toEqual(responseJson);
                done();
            });
        });

        test('with isBizSuccess return true', function(done) {
            const url = 'http://just-utils/test/apisender/get';
            const responseJson = {
                success: true,
                errorCode: 0,
                errorMessage: '',
                payload: {}
            };
            fetchMock.get(url, responseJson);
            ApiSender.send(url, {
                method: 'GET',
                isBizSuccess: function() { return true; }
            }).then(function(resultJson) {
                expect(resultJson).toEqual(responseJson);
                done();
            });
        });

        test('with isBizSuccess return false', function(done) {
            const url = 'http://just-utils/test/apisender/get';
            const responseJson = {
                success: true,
                errorCode: 0,
                errorMessage: '',
                payload: {}
            };
            fetchMock.get(url, responseJson);
            ApiSender.send(url, {
                method: 'GET',
                isBizSuccess: function() { return false; }
            }).catch(function(error) {
                expect(error.message).toBe('Unsuccessful api call');
                done();
            });
        });

        test('with isBizSuccess return non-true', function(done) {
            const url = 'http://just-utils/test/apisender/get';
            const responseJson = {
                success: true,
                errorCode: 0,
                errorMessage: '',
                payload: {}
            };
            fetchMock.get(url, responseJson);
            ApiSender.send(url, {
                method: 'GET',
                isBizSuccess: function() {}
            }).catch(function(error) {
                expect(error.message).toBe('Unsuccessful api call');
                done();
            });
        });
    });
    
    describe('test status code', function() {
        afterEach(function() {
            fetchMock.reset();
        });

        test('response with status code 200', function(done) {
            const url = 'http://just-utils/test/apisender/get';
            fetchMock.get(url, 200);
            ApiSender.send(url).then(function() {
                done();
            });
        });

        test('response with status code 300', function(done) {
            const url = 'http://just-utils/test/apisender/get';
            fetchMock.get(url, 300);
            ApiSender.send(url).catch(function(error) {
                expect(error.message).toBe('http status is not ok');
                done();
            });
        });
    });

    describe('test options.headers', function() {
        afterEach(function() {
            fetchMock.reset();
        });
        test('add additional headers', function() {
            const url = 'http://just-utils/test/apisender/get';
            fetchMock.get(url, 200);
            ApiSender.send(url, {
                headers: {
                    'x-csrf-token': 'xQOAK6ZlIOBsQTnUaSb3'
                }
            });
            const opts = fetchMock.lastOptions(url);
            expect(opts.headers).toEqual({
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/json',
                'x-csrf-token': 'xQOAK6ZlIOBsQTnUaSb3'
            });
        });

        test('override default headers', function() {
            const url = 'http://just-utils/test/apisender/get';
            fetchMock.get(url, 200);
            ApiSender.send(url, {
                headers: {
                    Accept: 'application/json'
                }
            });
            const opts = fetchMock.lastOptions(url);
            expect(opts.headers).toEqual({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            });
        });
    });
});

