// libs
const expect = require('expect.js');
const fetchMock = require('fetch-mock');
// src
const { ApiSender } = require('../../src/index');

describe('ApiSender', function() {
    describe('test first parameter[url]', function() {
        afterEach(function() {
            fetchMock.reset();
        });
        it('first parameter is passed', function(done) {
            const url = 'http://just-utils/test/apisender/get';
            fetchMock.get(url, 200);
            ApiSender.send(url).then(function() {
                done();
            });
        });
        
        it('first parameter is not passed', function() {
            try {
                ApiSender.send();
            } catch (error) {
                expect(error.name).to.be('TypeError');
            }
        });

        it('first parameter is passed with query string', function() {
            const url = 'http://just-utils/test/apisender/get';
            fetchMock.get(url, 200, {
                query: { qs: 'true' }
            });
            ApiSender.send(url + '?qs=true');
            expect(fetchMock.called(url, {
                method: 'GET',
                query: { qs: 'true' }
            })).to.be(true);
        });
    });

    describe('test GET request', function() {
        afterEach(function() {
            fetchMock.reset();
        });

        it('GET request without data', function() {
            const url = 'http://just-utils/test/apisender/get';

            fetchMock.get(url, 200);
            ApiSender.send(url, { method: 'GET' });
            expect(fetchMock.called(url, {
                method: 'GET'
            })).to.be(true);
        });

        it('GET request with empty-value data', function() {
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
            })).to.be(true);
        });

        it('append data as query string of GET request', function() {
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
            })).to.be(true);
        });

        it('append data as query string of GET request with query string', function() {
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
            })).to.be(true);
        });
    });

    describe('test not GET request', function() {
        afterEach(function() {
            fetchMock.reset();
        });

        it('not append data as query string of POST request', function() {
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
            expect(fetchMock.lastUrl(fetchMock.MATCHED)).to.be(url);
        });

        it('POST request with data', function() {
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
            })).to.be(true);
        });

        it('PUT request with data', function() {
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
            })).to.be(true);
        });
        it('DELETE request with data', function() {
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
            })).to.be(true);
        });
    });

    describe('test options.isBizSuccess callback', function() {
        afterEach(function() {
            fetchMock.reset();
        });
        
        it('without isBizSuccess', function(done) {
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
                expect(resultJson).to.eql(responseJson);
                done();
            });
        });

        it('with isBizSuccess return true', function(done) {
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
                expect(resultJson).to.eql(responseJson);
                done();
            });
        });

        it('with isBizSuccess return false', function(done) {
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
                expect(error.message).to.be('Unsuccessful api call');
                done();
            });
        });

        it('with isBizSuccess return non-true', function(done) {
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
                expect(error.message).to.be('Unsuccessful api call');
                done();
            });
        });
    });
    
    describe('test status code', function() {
        afterEach(function() {
            fetchMock.reset();
        });

        it('response with status code 200', function(done) {
            const url = 'http://just-utils/test/apisender/get';
            fetchMock.get(url, 200);
            ApiSender.send(url).then(function() {
                done();
            });
        });

        it('response with status code 300', function(done) {
            const url = 'http://just-utils/test/apisender/get';
            fetchMock.get(url, 300);
            ApiSender.send(url).catch(function(error) {
                expect(error.message).to.be('http status is not ok');
                done();
            });
        });
    });

    describe('test options.headers', function() {
        afterEach(function() {
            fetchMock.reset();
        });
        it('add additional headers', function() {
            const url = 'http://just-utils/test/apisender/get';
            fetchMock.get(url, 200);
            ApiSender.send(url, {
                headers: {
                    'x-csrf-token': 'xQOAK6ZlIOBsQTnUaSb3'
                }
            });
            const opts = fetchMock.lastOptions(url);
            expect(opts.headers).to.eql({
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/json',
                'x-csrf-token': 'xQOAK6ZlIOBsQTnUaSb3'
            });
        });

        it('override default headers', function() {
            const url = 'http://just-utils/test/apisender/get';
            fetchMock.get(url, 200);
            ApiSender.send(url, {
                headers: {
                    Accept: 'application/json'
                }
            });
            const opts = fetchMock.lastOptions(url);
            expect(opts.headers).to.eql({
                Accept: 'application/json',
                'Content-Type': 'application/json'
            });
        });
    });
});

