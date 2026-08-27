//SKILL 1

//Student Profile:

const firstName: string = "Laetitia";
const age: number = 31;
const isEnrolled: boolean = true;

const describeStudent = (firstName: string, age: number): string => {
  return `${firstName} is ${age} years old${isEnrolled ? " and is a student at Sundsgården!" : "."}`;
};

console.log(describeStudent(firstName, age));

//Greeting with Options:

const formalGreeting = (name: string, formal?: boolean): string => {
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

const shortNames = names.filter((n) => n.length <= 4);

console.log(
  `The names that are 4 or less characters long are: ${shortNames.join(", ")}`,
);

const longNames = names.filter((n) => n.length >= 8);

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
const findShortestName = (numbers: number[]): number => {
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
const shortestNames = names.filter((n) => n.length === shortest);

console.log(
  `The shortest ${shortestNames.length === 1 ? "name" : "names"} ${shortestNames.length === 1 ? "is" : "are"}: ${shortestNames.map((n) => n).join(", ")}.`,
);

//Longest name(s)
const longestNames = names.filter((n) => n.length === longestLength);

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

//Book Interface

interface Book {
  title: string;
  author: string;
  pages: number;
}

const myBook: Book = {
  title: "Everyone in My Family Has Killed Someone",
  author: "Benjamin Stevensson",
  pages: 385,
};

console.log(myBook.title);

//Nested & Optional Properties

interface Address {
  city: string;
  postalCode?: string;
}

interface Person {
  name: string;
  age: number;
  address: Address;
}

const santaClaus: Person = {
  name: "Saint Nicholas",
  age: 1756,
  address: {
    city: "North Pole",
    postalCode: "88888",
  },
};

console.log(santaClaus.address.city);

const theEasterBunny: Person = {
  name: "Easter Rabbit",
  age: 450,
  address: {
    city: "Easter Island",
  },
};

console.log(theEasterBunny.address.city);

//Challenge (optional) Interface with a Typed Function

interface Movie {
  id: number;
  title: string;
  rating: number;
  genres: string[];
}

const movies: Movie[] = [
  {
    id: 1,
    title: "Back To The Future",
    rating: 10,
    genres: [
      "comedy",
      "science fiction",
      "romance",
      "drama",
      "adventure",
      "action",
    ],
  },
  {
    id: 2,
    title: "Dodgeball: A True Underdog Story",
    rating: 8,
    genres: ["comedy", "action", "drama", "sports"],
  },
  {
    id: 3,
    title: "Monty Python and the Holy Grail",
    rating: 9,
    genres: ["comedy", "fantasy", "action", "adventure"],
  },
  {
    id: 4,
    title: "The Green Mile",
    rating: 9.5,
    genres: [
      "horror",
      "mystery",
      "melodrama",
      "comedy",
      "fantasy",
      "thriller",
      "drama",
      "supernatural",
      "detective fiction",
    ],
  },
];

//returns movies containing specific genre
const getMoviesByGenre = (movies: Movie[], genre: string): Movie[] => {
  const filterMovies = movies.filter((m) => m.genres.includes(genre));
  return filterMovies;
};

let genre = "drama";
let result = getMoviesByGenre(movies, genre);
const movieResults = result.map((m) => m.title);

//logs movie titles with drama as a genre
console.log(
  `The ${result.length === 1 ? "movie" : "movies"} with the genre of ${genre} ${result.length === 1 ? "is" : "are"}: ${movieResults.join(", ")}`,
);

movies.push({
  id: 5,
  title: "Rental Family",
  rating: 9,
  genres: ["comedy", "drama"],
});

genre = "comedy";
result = getMoviesByGenre(movies, genre);
const newMovieResults = result.map((m) => m.title);

//logs movie titles with comedy as a genre
console.log(
  `The ${result.length === 1 ? "movie" : "movies"} with the genre of ${genre} ${result.length === 1 ? "is" : "are"}: ${newMovieResults.join(", ")}`,
);

//SKILL 4: Chaining Array Methods on Interface Data

//Filter only

interface Product {
  id: number;
  productName: string;
  price: number;
  tags: string[];
}

const products = [
  {
    id: 1,
    productName: "USB-C Cable",
    price: 49,
    tags: ["electronics", "accessory"],
  },
  {
    id: 2,
    productName: "Coffee Mug",
    price: 129,
    tags: ["kitchen", "home", "work"],
  },
  {
    id: 3,
    productName: "Wireless Mouse",
    price: 299,
    tags: ["electronics", "accessory"],
  },
  {
    id: 4,
    productName: "Noise Cancelling Headphones",
    price: 990,
    tags: ["electronics", "audio"],
  },
  {
    id: 5,
    productName: "Standing Desk",
    price: 3499,
    tags: ["furniture", "work"],
  },
];

//log products under 1000
const underThousandKronor = products.filter((p) => p.price < 1000);
const numberOfProductsUnderPrice: number = underThousandKronor.length;

console.log(underThousandKronor);
console.log(
  `There ${numberOfProductsUnderPrice === 1 ? "is" : "are"} ${numberOfProductsUnderPrice} ${numberOfProductsUnderPrice === 1 ? "product" : "products"} that ${numberOfProductsUnderPrice === 1 ? "is" : "are"} under 1000kr`,
);

//Filter + Map

const productWithTagWork: string[] = products
  .filter((p) => p.tags.includes("work"))
  .map((p) => p.productName);

const numberOfProductsWithTag: number = products.filter((p) =>
  p.tags.includes("work"),
).length;

//log names of all products tagged 'work'
console.log(productWithTagWork);
console.log(
  `There ${numberOfProductsWithTag === 1 ? "is" : "are"} ${numberOfProductsWithTag} ${numberOfProductsWithTag === 1 ? "product" : "products"} that ${numberOfProductsWithTag === 1 ? "has" : "have"} the tag 'work': ${productWithTagWork.join(", ")}`,
);

//Challenge (optional) Filter + Map + Join

const productWithMultiTags: number = products.filter(
  (p) => p.tags.length > 1,
).length;
console.log(productWithMultiTags);
const multipleTags = products
  .filter((p) => p.tags.length > 1)
  .map((p) => `${p.productName} (${p.price}kr)`)
  .join(", ");

console.log(
  `The ${productWithMultiTags === 1 ? "product" : "products"} with multiple tags ${productWithMultiTags === 1 ? "is" : "are"}: ${multipleTags}`,
);
