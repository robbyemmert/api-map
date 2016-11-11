import { Api } from './api-map';
import resolver from 'api-map-fetch-resolver';
window.resolver = resolver;

var api = new Api({
    baseUrl: '/api',
    defaultHeaders: {
        contentType: 'application/json'
    }
}, resolver);
window.api = api;

export default api;
