import api from './api';

export let users = api.map({
    url: '/users',
    method: 'GET'
});

export let getUser = api.map({
    url: params => `/users/${params.userId}`,
    method: 'GET'
});

export let saveUser = api.map({
    url: '/users',
    method: 'POST',
    body: {
        upsert: true
    }
});
