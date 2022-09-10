# Tacitact examples

Examples on how to use the [`tacitact`](https://www.npmjs.com/package/tacitact) _npm_ package in different environments.

## Import `Server` in ESM module

See source code in [server-mjs](./server-mjs/).

Inside the directory you need to install the dependencies and then start the server:

```
$ cd server-mjs
$ npm install
$ npm run serve
```

## Require `Server` in CommonJS

See source code in [server-cjs](./server-cjs/).

Inside the directory you need to install the dependencies and then start the server:

```
$ cd server-cjs
$ npm install
$ npm run serve
```

## Use `Client` in web browser

See source code in [client-web](./client-web/).

Start one of the server examples (it works with both), then open

```
http://localhost:<port>
```

(where `<port>` is the port that was logged to the console when starting the server) in your web browser.

You will see how the time is being synced. For more detailed output open the developer console by pressing <kbd>F12</kbd>.
