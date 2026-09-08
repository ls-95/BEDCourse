//Order Confirmation

type OrderCallback = () => void;

// const placeOrder = (item: string, callback: () => void): void => {
//   console.log(`Order placed for ${item}`);
//   callback();
// };

const placeOrder = (item: string, callback: OrderCallback): void => {
  console.log(`Order placed for ${item}`);
  callback();
};

placeOrder("Pen", () => {
  console.log("Thanks for your order!");
});

//Sum with a Named Type

type SumCallback = (result: number) => void;

const sumNumbers = (a: number, b: number, callback: SumCallback) => {
  callback(a + b);
};

const addition = (result: number): void => {
  console.log(result);
};

sumNumbers(3, 5, addition);

//Challenge (optional): Callback with Multiple Parameters

type CompareCallback = (a: number, b: number) => string;

const compareNumbers = (
  a: number,
  b: number,
  callback: CompareCallback,
): string => {
  return callback(a, b);
};

console.log(
  compareNumbers(3, 5, (a: number, b: number) => {
    return a > b ? "a is bigger" : a === b ? "equal" : "b is bigger";
  }),
);
console.log(
  compareNumbers(87, 34, (a: number, b: number) => {
    /*
      return a > b
      ? `The difference is ${a - b}!`
      : a === b
        ? "There is no difference!"
        : `The difference is ${b - a}`;
      return a > b ? `${a - b}!` : a === b ? "0" : `${b - a}`;
    */
    return `${a - b}`;
  }),
);
