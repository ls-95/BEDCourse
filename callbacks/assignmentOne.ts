//Hello Callback

type helloFunction = (message: string) => void;

const greeting = (hello: helloFunction): void => {
  hello("Hello from callback!");
};

const hello = (message: string): void => {
  console.log(message);
};

greeting(hello);
