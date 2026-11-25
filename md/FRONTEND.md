# Easy

## Exercise 1:

The API and the client are two separate programs. Each needs its own packages, so each has its own `package.json`. If react was in the API's `package.json`, the two projects would get mixed up. The API would also have packages it would never use.


While you run `npm run dev`, Vite starts the local server for the react app and when changes are made inside a file, the browser updates by itself.