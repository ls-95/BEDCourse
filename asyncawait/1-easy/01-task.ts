/*
  const coinFlip = () => {
    return new Promise((resolve, reject) => {
      const outCome = Math.random() > 0.5;
      outCome ? resolve("You win!") : reject("You lose");
   });
  };

  coinFlip();
*/

/* .then().catch()

  const coinFlip = new Promise((resolve, reject) => {
    const outCome = Math.random() > 0.5;

    outCome ? resolve("You win!") : reject("You lose");
  });

  coinFlip
    .then((message) => {
      console.log(message);
    })
    .catch((error) => {
      console.log(error);
    });
*/

//Try catch

const coinFlip = new Promise((resolve, reject) => {
  const outCome = Math.random() > 0.5;

  outCome ? resolve("You win!") : reject("You lose!");
});

const result = async () => {
  try {
    const message = await coinFlip;
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

result();
