/*

const fetchAdviceById = (id: number) => {
  fetch(`https://api.adviceslip.com/advice/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Fetching did not work");
      }
      return response.json();
    })
    .then((data) => console.log(`Advice ID: ${id}: ${data.slip.advice}`))
    .catch((error) => console.log("Error fetching advice:", error));
};

*/

const fetchAdvice = async (id: number): Promise<void> => {
  try {
    const response: Response = await fetch(
      `https://api.adviceslip.com/advice/${id}`,
    );
    if (!response.ok) {
      throw new Error("Fetching did not work");
    }
    const data = await response.json();
    if (!data.slip) {
      throw new Error(`Couldn't find advice with id "${id}"`);
    }
    console.log(`Advice ID: ${id}: ${data.slip.advice}`);
  } catch (error) {
    console.log("Error fetching advice:", error);
  }
};

fetchAdvice(9999999);
