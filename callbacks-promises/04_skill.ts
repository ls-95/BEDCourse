//Your Own Promise

const checkStock = new Promise((resolve, reject) => {
  console.log("1. We will find out if the item is in stock.");
  const inStock = true;
  if (inStock) {
    console.log("2. In stock");
    resolve("3. Resolved successfully");
  } else {
    console.log("4. Not in stock");
    reject("5. Rejected");
  }
  console.log("6. We now know if the item is in stock.");
});

console.log("7. Item is in stock");

checkStock
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  });

//As the code reads from top to bottom and isStock is true, it will print 1, 2, 6 and 7 are printed before 3 as resolve tells .then() to run but it waits until everything else has run.

//Tracing Execution Order

const myPromise = new Promise((resolved, reject) => {
  console.log("1. This executor function starts immediately!");
  const success = true;

  if (success) {
    console.log("2. Operation was successful!");
    resolved("Resolved operation successfully!");
  } else {
    console.log("2. Operation failed!");
    reject("Resolved operation rejected!");
  }
  console.log("3. Executor function has finished");
});

myPromise
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  });

console.log("4. New log added");

//I think 4 will log before .then() as .then() waits for all other code to run before running.
//The prediction worked as thought

//Challenge (optional): Forcing a Rejection

const myPromise2 = new Promise((resolved, reject) => {
  console.log("1. This executor function starts immediately!");
  const success = false;

  if (success) {
    console.log("2. Operation was successful!");
    resolved("Resolved operation successfully!");
  } else {
    console.log("2. Operation failed!");
    reject("I'm sorry to inform you that the execution has failed...");
  }
  console.log("3. Executor function has finished");
});

myPromise2
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log("Something went wrong: " + error);
  });

//A Promise that is pending means that the executor runs and it is attempting to perform a job. No decision has been made.

// If successful (if the success was true), it calls resolve(), the promise becomes "fulfilled" which then triggers .then() which will log the message stored inside of resolve(). (as there is a console.log inside of .then()).

// If rejected, it will call reject() and the promise becomes "rejected" that will then trigger .catch() which will log (as there is a console.log) the value inside the reject().
