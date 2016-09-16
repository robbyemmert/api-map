const defaultApiOptions = {
    baseUrl: '/',
    defaultHeaders: []
}

export class Api {
    constructor(options) {
        this.options = Object.assign({}, options);

        this._resolver = false;
    }

    resolve(resolver) {
        if (typeof resolver !== 'function') {
            throw new Error('Resolver must be a function');
        }

        this._resolver = resolver;
    }
}

export class ApiEndpoint {
    constructor(options) {
        this.options = Object.assign({}, options);

    }
}
