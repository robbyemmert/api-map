import { Api, Validators } from './api-map';

var api = new Api({
    baseUrl: '/api',
    defaultHeaders: {
        contentType: 'application/json'
    }
});

api.resolve((url, method, data, options) => {

    let optionalOptions = {
        headers: [],
        redirect: 'follow'
    }

    let mandatoryOptions = {};

    options = Object.assign({}, optionalOptions, options, mandatoryOptions);

    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: options.headers,
        redirect: options.redirect
    });
})

export default api;
