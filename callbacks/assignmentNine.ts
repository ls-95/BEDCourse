//Math with Different Operations

type DifferentOperatorsFunction = (number: number) => void;

const calculate = (
  a: number,
  b: number,
  operator: string,
  differntOperators: DifferentOperatorsFunction,
): void => {
  let result: number = 0;
  operator === "+"
    ? (result = a + b)
    : operator === "-"
      ? (result = a - b)
      : operator === "*"
        ? (result = a * b)
        : operator === "/"
          ? (result = a / b)
          : null;
  differntOperators(result);
};

const differntOperators = (number: number): void => {
  console.log(number);
};

calculate(80, 8, "+", differntOperators);
calculate(80, 8, "-", differntOperators);
calculate(80, 8, "*", differntOperators);
calculate(80, 8, "/", differntOperators);
