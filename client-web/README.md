# Web Client

Start the backend server that is configured in `../config.json` to have a backend for `tacitact` sync and to have the client files served!

Then start the server in the `client-web` directory that serves the web client and proxies the request to the backend server with `$ npm run serve`.

> Note: do not open the `index.html` directly from the file system as it would come with restrictrions in the browser. Also you wouldn't have no access to tacitact as it is proxied through the web client's server.


## Run

Start with `$ npm run serve`.
