//Delayed Greeting

type displayGreetingFunction = (message: string) => void;

const sayHelloLater = (displayGreeting: displayGreetingFunction) => {
  setTimeout(() => {
    displayGreeting("Hi, I am late!");
  }, 2000);
};

const displayGreeting = (message: string): void => {
  console.log(message);
};

sayHelloLater(displayGreeting);
