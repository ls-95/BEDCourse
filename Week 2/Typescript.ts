//SKILL 1

//Student Profile:

const firstName: string = "Laetitia";
const age: number = 31;
const isEnrolled: boolean = true;

const describeStudent = (firstName: string, age: number) => {
  return `${firstName} is ${age} years old${isEnrolled ? " and is a student at Sundsgården!" : "."}`;
};
console.log(describeStudent(firstName, age));

//Greeting with Options:

const formalGreeting = (name: string, formal?: boolean) => {
  return formal ? `Good day, ${name}.` : `Hi ${name}!`;
};

console.log(formalGreeting("Caractacus", true));
console.log(formalGreeting("Bob"));

//SKILL 2

//Increasing ages:

const ages: number[] = [5, 25, 34, 44, 62, 83];

const agesInFiveYears: number[] = ages.map((a) => a + 5);
console.log(agesInFiveYears);

//Filtering Names:

const names: string[] = [
  "Cillian",
  "Saoirse",
  "Mia",
  "Zoe",
  "Hamish",
  "Noah",
  "Peony",
  "Ada",
  "Bartholomew",
  "Owen",
  "Tabatha",
  "Amélie",
  "Seraphina",
  "Tia",
  "Alexander",
  "Evangeline",
];

const shortNames: string[] = names.filter((n) => n.length <= 4);
console.log(
  `The names that are 4 or less characters long are: ${shortNames.join(", ")}`,
);

const longNames: string[] = names.filter((n) => n.length >= 8);
console.log(
  `The names that are 8 or more characters long are: ${longNames.join(", ")}`,
);

let longestLength: number = 0;
let namesLength: number[] = [];

// ? is used to check first in case the result doesn't exist, it will give an undefined instead of crashing.
// ?? operator = if the left one is undefined or null, use the other side

//Find the longest name(s)
for (let i: number = 0; i < names.length; i++) {
  if ((names[i]?.length ?? 0) > longestLength) {
    longestLength = names[i]?.length ?? longestLength;
  }
  namesLength.push(names[i]?.length ?? 0);
}

//Find the shortest name(s)
const findShortestName = (numbers: number[]) => {
  let minNumber: number = namesLength[0] ?? 0;
  for (let num of numbers) {
    if (num < minNumber) {
      minNumber = num;
    }
  }
  return minNumber;
};
const shortest = findShortestName(namesLength);

//Shortest name(s)
const shortestNames: string[] = names.filter((n) => n.length === shortest);
console.log(
  `The shortest ${shortestNames.length === 1 ? "name" : "names"} ${shortestNames.length === 1 ? "is" : "are"}: ${shortestNames.map((n) => n).join(", ")}.`,
);

//Longest name(s)
const longestNames: string[] = names.filter((n) => n.length === longestLength);
console.log(
  `The longest ${longestNames.length === 1 ? "name" : "names"} ${longestNames.length === 1 ? "is" : "are"}: ${longestNames.map((n) => n).join(", ")}.`,
);

//Challenge (optional) Combination Transformation

const scores: number[] = [15, 82, 47, 56, 92, 43, 4, 91, 33, 76, 29, 55, 100];

//Keep scores that are 50 or above (passing scores)
const passingScores = scores.filter((s) => s >= 50).map((s) => s);
console.log(passingScores);
console.log(
  `Out of ${scores.length} students, ${passingScores.length} passed!`,
);

//Convert each passing score into a letter grade string
const passingGradeScores: string[] = scores
  .filter((s) => s >= 50)
  .map((s) => (s >= 95 ? "A+" : s >= 85 ? "A" : s >= 75 ? "B" : "C"));

console.log(passingGradeScores);

//Log the final array of letter grades
const allGradeScores: string[] = scores.map((s) =>
  s >= 95
    ? "A+"
    : s >= 85
      ? "A"
      : s >= 75
        ? "B"
        : s >= 50
          ? "C"
          : s >= 30
            ? "D"
            : "F",
);

console.log(allGradeScores);

//How many students failed
const failedScores = scores.filter((s) => s < 50);
console.log(
  `Out of ${scores.length} students, ${failedScores.length} failed..`,
);

//SKILL 3: Interfaces
