//Countdown Timer
type callbackFunction = () => void;

/* 
  Logs in order:

  1. The countdown will start now
  2. Log after countdown
  3. Time's up!
  4. Countdown finished

  1 and 2 are logged directly as they are not set to log after three seconds, whereas 3 and 4 are, so they appear in the terminal 3 seconds later.

*/

const countdown = (seconds: number, callback: callbackFunction): void => {
  console.log("The countdown will start now!");
  setTimeout(() => {
    console.log("Time's up!");
    callback();
  }, seconds * 1000);
  console.log("Log after countdown!");
};

countdown(3, () => {
  console.log("Countdown finished!");
});

//Delayed Greeting

type DelayedGreeting = () => void;

const delayedGreeting = (
  name: string,
  delay: number,
  callback: DelayedGreeting,
): void => {
  setTimeout(() => {
    console.log(`Hi ${name}, thanks for waiting!`);
    callback();
  }, delay);
};

delayedGreeting("Sam", 1500, (): void => {
  console.log("Callback executed!");
});

//Challenge (optional): Two Timers, One Order

//I predict that the one second timer will print the logs first and then two seconds afterwards, the three second logs will print.

//The prediction was correct, this is because, I believe, that they are being called seperately so they do not interfer with each other.

type DelayedMessage = () => void;

const delayedMessage = (
  message: string,
  delay: number,
  callback: DelayedMessage,
): void => {
  setTimeout(() => {
    console.log(message);
    callback();
  }, delay);
};

delayedMessage(
  "This message will show after three seconds.",
  3000,
  (): void => {
    console.log("The three second delay is over!");
  },
);

delayedMessage("This message will show after one second.", 1000, (): void => {
  console.log("The one second delay is over!");
});
