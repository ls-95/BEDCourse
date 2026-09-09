/*

const fetchAdvice = () => {
  fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((data) => console.log(data.slip.advice))
    .catch((error) => console.log("Error fetching advice:", error));
};

*/

const fetchAdvice = async (): Promise<void> => {
  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    if (!response.ok) {
      throw new Error("Error fetching data.");
    }
    const data = await response.json();
    const advice = data.slip.advice;
    console.log(`Advice: ${advice}`);
  } catch (error) {
    console.log("Error fetching advice:", error);
  }
};

fetchAdvice();
