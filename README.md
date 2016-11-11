# API Map
By: Robby Emmert

- Define your API endpoints once, then call them with a one-liner from anywhere.  
- Implement global API settings such as headers and base url.  
- Switch API clients with one line of code.

### Quick Start  
1. Install ApiMap to your project with `npm install --save api-map`  

2. Set up your global API settings, where `resolver` is a function that returns a promise, given a url, method, data, and network settings (read more about resolvers [here](docs/resolvers.md) or see a list of pre-build resolvers available on NPM [here](docs/resolver-list.md)).   

```javascript
import { Api } from 'api-map';
import resolver from './custom-resolver';
// OR
import resolver from 'api-map-fetch-resolver' // or a pre-built resolver of your choice

var api = new Api({
    baseUrl: '/api',
    defaultHeaders: {
        contentType: 'application/json'
    }
}, resolver);
```  
3. Define your endpoints  

```javascript  
var postList = api.map({
    url: '/posts',
    method: 'GET'
});
```  

-or-

```javascript
var singlePost = api.map({
    url: params => `/posts/${params.id}`
    // Method is 'GET' by default on all endpoint definitions.
});

```

4. Query the api in DRY fashion:

```javascript  
postList.request()
    .then(res => console.log('result', res));
```  

-or-

```javascript  
singlePost.request({ id: 123 })
    .then(res => console.log('result', res));
```
