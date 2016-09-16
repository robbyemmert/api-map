import api from './api';

export let postList = api.map({
    url: '/posts',
    method: 'GET'
});

export let singlePost = api.map({
    url: params => `/posts/${params.id}`
});
