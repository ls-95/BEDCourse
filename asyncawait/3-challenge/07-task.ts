const coinFlip = new Promise((resolve, reject) => {
  const outCome = Math.random() > 0.5;

  outCome ? resolve("You win!") : reject("You lose!");
});

const result = async () => {
  try {
    const message = await coinFlip;
    console.log(message);
    if (message === "You win!") {
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        throw new Error("Error fetching data.");
      }
      const data = await response.json();
      const advice = data.slip.advice;
      console.log(`Advice: ${advice}`);
    }
  } catch (error) {
    console.log(error);
  }
};

result();
