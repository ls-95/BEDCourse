## The screenshots will be added to the screenshot folder.

# Different Routes:

## 01 - Home route "/"

- Used res.send() as simple string is being sent.
- Home path.
- Returns a plain text string.
- Status code: 200.

## 02 - Introduction route "/introduction"

- Used res.json() as it is a JSON object being sent.
- Introduction path.
- Returns a JSON object containing Formula One data (teams with drivers, race calendar, driving standings).
- Status code: 200.

## 03 - About route "/about"

- Used res.status(200).json() as it is a JSON object being sent when the status code is 200.
- About path.
- Returns a JSON object containing Formula One information (description, year founded, year of first World Championship, first World Champion, fun fact).
- Status code: 200.

## 04 - Message route "/message"

- Used res.send() as simple string is being sent.
- Message path.
- Returns a plain text string.
- Status code: 404.

## 05 - Hello route "/hello"

- No method was used as route does not exist.
- No path
- Returns status code 404 error message: "Cannot GET /hello".
- Status code: 404.

## 06 - Maintenance route "/maintenance"

- Used res.status(503).send() as simple string is being sent when the code status is 503.
- Maintenance path.
- Returns status code 503 error message: "We're down for maintenance, check back soon!".
- Status code: 503.
