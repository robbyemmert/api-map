const apiDefaults = {
    baseUrl: '/',
    defaultHeaders: []
}

const endpointDefaults = {
    method: 'GET',
    headers: []
}

export class Api {
    constructor(defaults, resolver) {
        if (typeof resolver !== 'function') {
            throw new Error('Resolver must be a function');
        }

        this._defaults = Object.assign({}, defaults);
        this._resolver = resolver;
    }

    get defaults() {
        return Object.assign({}, apiDefaults, this._defaults);
    }

    resolve(url, method, data, options) {
        return this._resolver(url, method, data, options)
            .then(res => new ApiResponse(res), res => new ApiResponse(res));
    }

    map(options) {
        return new ApiEndpoint(options, this);
    }
}

export class ApiEndpoint {
    constructor(defaults, api) {
        this._checkDefaults(defaults);
        this._defaults = Object.assign({}, defaults);
        this._api = api;
    }

    get defaults() {
        return this._defaults;
    }

    get api() {
        return this._api;
    }

    _checkDefaults(defaults) {
        if (!defaults.url) {
            throw new Error('API endpoint must specify a URL');
        }
    }

    request(data, options) {
        let url = typeof this._defaults.url === 'function' ? this._defaults.url(data) : this._defaults.url;
        let compiledOptions = Object.assign({}, endpointDefaults, this.api.defaults, this.defaults, options);
        return this.api.resolve(this.api.defaults.baseUrl + url, compiledOptions.method, data, compiledOptions);
    }
}

export class ApiResponse {
    constructor(data) {
        Object.keys(data).forEach(key => {
            this[key] = data[key];
        });

        this._checkValue('url', data.url, 'string');
        this._checkValue('method', data.method, 'string');
        this._checkValue('status', data.status, 'number');
        this._checkValue('headers', data.headers, () => Array.isArray(data.headers));
        this._checkValue('message', data.message, 'string');
        // this._checkValue('requestBody', data.requestBody, () => typeof data.data !== undefined);
        // this._checkValue('requestOptions', data.requestOptions, () => true);
        // this._checkValue('data', data.url, () => true);
    }

    _checkValue(propName, value, expectedType) {
        if (typeof expectedType === 'function') {
            expectedType = expectedType(value);
        } else if (typeof value !== expectedType) {
            console.warn(`Your API resolver returned an unexpected ${propName} of type ${typeof value}`, value);
        }
    }
}
