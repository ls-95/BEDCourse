//Temperature converter

type ConvertCallback = (celsius: number) => number;

const convertTemperature = (
  celsius: number,
  callback: ConvertCallback,
): number => {
  return callback(celsius);
};

convertTemperature(35, (celsius) => {
  let result = (celsius * 9) / 5 + 32;
  console.log(`${celsius}°C is ${result}°F`);
  return result;
});

convertTemperature(35, (celsius) => {
  let result = celsius + 273.15;
  console.log(`${celsius}°C is ${result}K`);
  return result;
});

//Array Processor with a Return Value

type ReduceCallback = (accumulator: number, current: number) => number;

const processNumbers = (arr: number[], callback: ReduceCallback): number => {
  let total: number = 0;
  arr.forEach((item) => {
    total = callback(total, item);
  });
  console.log(total);
  return total;
};

processNumbers([5, 3, 35, 44, 25], (accumulator, current) => {
  return accumulator + current;
});

//Challenge (optional): Naming Collision, On Purpose

type Volume = (side: number) => number;

const Volume = (side: number): number => {
  return side ** 3;
};

const applyToCube = (callback: Volume): number => {
  return callback(3);
};

applyToCube(Volume);
console.log(applyToCube(Volume));

//It's better practice to not have the same names as it will avoid confustion and if there is an error it will avoid trying to figure out if it is the type that is wrong or the variable. The code still works are the names are for different things. One is a type and one a variable so they do not interfere with each other.
