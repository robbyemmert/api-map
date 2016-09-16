import { Api } from './api-map';

var customResolver = (url, method, data, options) => {

    let optionalOptions = {
        headers: [],
        redirect: 'follow'
    }

    let mandatoryOptions = {};

    options = Object.assign({}, optionalOptions, options, mandatoryOptions);

    if (method === 'GET' && typeof data === 'object') {
        let paramString = '?' + Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
        url = url + paramString;
    }

    return fetch(url, {
        method: method,
        body: method != 'GET' ? JSON.stringify(data) : undefined,
        headers: options.headers,
        redirect: options.redirect
    });
};

var api = new Api({
    baseUrl: '/api',
    defaultHeaders: {
        contentType: 'application/json'
    }
}, customResolver);

export default api;
