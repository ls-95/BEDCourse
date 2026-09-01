//Wrap It Up
const wrapInArray = <T>(item: T): T[] => {
  let arrayItems = [];
  arrayItems.push(item);
  return arrayItems;
};

console.log(wrapInArray("cat"));

//First In Line
const firstItem = <T>(arr: T[]): T => {
  return arr[0];
};

console.log(firstItem(["A", "B", "C"]));
console.log(firstItem([1, 2, 3]));

//Challenge (optional) Swap Places
const swap = <T>(item1: T, item2: T): T[] => {
  let orderedArray = [];
  orderedArray.push(item1, item2);
  let reversedArray = orderedArray.reverse();
  return reversedArray;
};

console.log(swap("hello", "world"));
console.log(swap(4, 10));
