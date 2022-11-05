# Tacitact examples

Examples on how to use the [`tacitact`](https://github.com/frederikheld/tacitact) library in different environments.

## Provide `tacitact` dependency

Before you install the different examples as documented in the subsequent paragraphs, you have to provide the `tacitact` dependency. This is necessary because `tacitact` lives in a private GitHub repository that can not be installed with npm directly. Instead npm installs it as a file dependency, which means that you have to clone and build the repository yourself before npm can install it.

Clone the [`tacitact` repo](https://github.com/frederikheld/tacitact) into the same directory where this `tacitact-examples` repo is located:

```
common_root
 ├─ tacitact
 └─ tacitact-examples
```

After that, you can `cd` into the `tacitact` directory and run

```sh
$ npm install
$ npm run build
```

to build `tacitact`. For more options for building the library, see [its readme file](https://github.com/frederikheld/tacitact#develop).

`cd` back into the `tacitact-examples` directory and you're ready to install the examples as documented in the folowing paragraphs.

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

Start one of the server examples (it will work with both). The server will serve the client JS files as well as the `index.html` page, which you can open in your web browser via:

```
http://localhost:<port>
```

(where `<port>` is the port that was logged to the console when starting the server)

You will see how the time is being synced. For more detailed output open the developer console by pressing <kbd>F12</kbd>.
