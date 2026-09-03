//Math Callback

// type numbersFunction = (a: number, b: number) => void;

// const addNumbers = (numbers: numbersFunction) => {
//   numbers(123, 321);
// };

// const numbers = (a: number, b: number): void => {
//   console.log(a + b);
// };

// addNumbers(numbers);

type NumbersFunction = (addition: number) => void;

const addNumbers = (a: number, b: number, numbers: NumbersFunction): void => {
  numbers(a + b);
};

const numbers = (addition: number): void => {
  console.log(addition);
};

addNumbers(987, 543, numbers);
