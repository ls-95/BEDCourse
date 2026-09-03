//Math Callback

type numbersFunction = (a: number, b: number) => void;

const addNumbers = (numbers: numbersFunction) => {
  numbers(123, 321);
};

const numbers = (a: number, b: number): void => {
  console.log(a + b);
};

addNumbers(numbers);
