//Delayed Message

/* .then() .catch()

const delayedMessage = (message: string, delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, delay);
  });
};

delayedMessage("This is a delayed message", 2000)
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

  */

const delayedMessage = (message: string, delay: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, delay);
  });
};

const result = async (): Promise<void> => {
  try {
    const message = await delayedMessage("This is a delayed message", 3000);
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

result();
