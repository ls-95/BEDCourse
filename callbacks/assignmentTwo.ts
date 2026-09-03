//Delayed Greeting

type GreetingMessageFunction = (message: string) => void;

const sayHelloLater = (displayGreeting: GreetingMessageFunction) => {
  setTimeout(() => {
    displayGreeting("Hi, I am late!");
  }, 2000);
};

const greetingMessage = (message: string): void => {
  console.log(message);
};

sayHelloLater(greetingMessage);
