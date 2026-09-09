const fetchAdvice = async (id1: number, id2: number): Promise<void> => {
  try {
    // const response1 = await fetch(`https://api.adviceslip.com/advice/${id1}`);
    // const response2 = await fetch(`https://api.adviceslip.com/advice/${id2}`);
    const [response1, response2] = await Promise.all([
      fetch(`https://api.adviceslip.com/advice/${id1}`),
      fetch(`https://api.adviceslip.com/advice/${id2}`),
    ]);
    if (!response1.ok || !response2.ok) {
      throw new Error("Fetching did not work");
    }
    // const data1 = await response1.json();
    // const data2 = await response2.json();
    const [data1, data2] = await Promise.all([
      response1.json(),
      response2.json(),
    ]);

    if (!data1.slip && !data2.slip) {
      throw new Error(`Couldn't find advices with ids "${id1}" and ${id2}"`);
    } else if (!data1.slip || !data2.slip) {
      throw new Error(
        `Couldn't find advice with id: "${!data1.slip ? id1 : id2}"`,
      );
    }
    console.log(`Advice ID ${id1}: ${data1.slip.advice}`);
    console.log(`Advice ID ${id2}: ${data2.slip.advice}`);
  } catch (error) {
    console.log("Error fetching advice:", error);
  }
};

fetchAdvice(8, 999999);
fetchAdvice(888888, 9);
fetchAdvice(888888, 999999);
