import { Api } from './api-map';
import resolver from './custom-resolver';

var api = new Api({
    baseUrl: '/api',
    defaultHeaders: {
        contentType: 'application/json'
    }
}, resolver);

export default api;
