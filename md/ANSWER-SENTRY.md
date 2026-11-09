# Easy

## Exercise 1

instrument.js needs to be imported before everything else as it needs to run before the rest of the code loads so it can watch what happens (catch errors).

DSN is in the .env file (which is in the .gitignore file) as it is the information needed to access the Sentry project. Anyone who has it can send data to the project.

## Exercise 2

![Dashboard](../sentry-screenshots/dashboard-exercise-2.png);

![First Issue](../sentry-screenshots/first-sentry-error.png);

The information that Sentry has still recorded even without adding extra information is about the error, about the request and the visitor and then about the computer.

The information that is mentioned about the error is related to the error message, if the error has been handled and the stack trace (the file name and the line number where the error was thrown -> index.ts, line 47).

The information mentioned about the request and the visitor is the request itself (the method, url and the headers), the ip address and the browser used.

Then the information mentioned about the computer used is the operating system, Node.js version, environment, computer name, processor, memory, time of the error and the breadcrumbs.
