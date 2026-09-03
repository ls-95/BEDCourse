//Delayed Greeting

type greetingMessageFunction = (message: string) => void;

const sayHelloLater = (displayGreeting: greetingMessageFunction) => {
  setTimeout(() => {
    displayGreeting("Hi, I am late!");
  }, 2000);
};

const greetingMessage = (message: string): void => {
  console.log(message);
};

sayHelloLater(greetingMessage);
