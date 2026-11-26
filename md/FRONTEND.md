# Easy

## Exercise 1:

The API and the client are two separate programs. Each needs its own packages, so each has its own `package.json`. If react was in the API's `package.json`, the two projects would get mixed up. The API would also have packages it would never use.


While you run `npm run dev`, Vite starts the local server for the react app and when changes are made inside a file, the browser updates by itself.

## Exercise 2

I took a screenshot but it was an error of the wrong port (I used 3001 instead of 3000). I only saw this after installing cors. So when I tried to comment out `app.use(cors({ origin: "http://localhost:5173" }));`, it wasn't working (to get the screenshot of the CORS error), even after restarting the server and refreshing the page. I then decided to change the localhost to see if I could get the error and I did.

![Connect Error](../screenshots/frontend/cors-error.png)

CORS is a safety check that the browser does. The client (localhost:5173) asked the API (localhost:3001) for data. The browser saw two different addresses and asked the API if it was allowed. The API had not said yes yet, so the browser blocked the request. Insomnia is not a browser, so it does not do this check.

If any origin is allowed, any website can use my API. With one origin, only the client is allowed. When the frontend is put online, then the origin would need to be changed to the real web address of the site.