//Hello Callback

type HelloFunction = (message: string) => void;

const greeting = (hello: HelloFunction): void => {
  hello("Hello from callback!");
};

const hello = (message: string): void => {
  console.log(message);
};

greeting(hello);
