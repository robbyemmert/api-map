export default (url, method, data, options) => {

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

    let promise = fetch(url, {
        method: method,
        body: method != 'GET' ? data : undefined,
        headers: options.headers,
        redirect: options.redirect
    });

    promise = promise.then(res => res.json());

    return promise;
};
