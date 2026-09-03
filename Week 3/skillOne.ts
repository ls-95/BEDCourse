//ID CARD

type IDtype = number | string;

const showID = (IDtype: IDtype): string => {
  return `Your ID is: ${IDtype}`;
};
console.log(showID(12345));
console.log(showID("AB123"));

//Fruit Basket
type Fruit = "apple" | "banana" | "orange";

const eatFruit = (fruit: Fruit): string => {
  return `You ate ${fruit === "banana" ? "a" : "an"} ${fruit}`;
};

console.log(eatFruit("apple"));
console.log(eatFruit("orange"));
console.log(eatFruit("banana"));

//Challenge (optional) Pass or Fail
type Result = true | false;

const printResult = (result: Result): string => {
  return result === true ? "Pass" : "Fail";
};
console.log(printResult(true));
console.log(printResult(false));
