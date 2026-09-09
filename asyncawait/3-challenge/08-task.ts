const runningSameTime = async (): Promise<void> => {
  try {
    const [response1, response2] = await Promise.all([
      fetch("https://api.adviceslip.com/advice"),
      fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=56.0467&longitude=12.6944&current=temperature_2m",
      ),
    ]);
    if (!response1.ok || !response2.ok) {
      throw new Error("Fetching did not work");
    }
    const [data1, data2] = await Promise.all([
      response1.json(),
      response2.json(),
    ]);

    if (!data1.slip && !data2.current) {
      throw new Error("Couldn't find advice or weather");
    } else if (!data1.slip || !data2.current) {
      throw new Error(`Couldn't find: "${!data1.slip ? "advice" : "weather"}"`);
    }

    console.log(`Here is some random advice: ${data1.slip.advice}`);
    console.log(
      `The temperature in Helsingborg is currently ${data2.current.temperature_2m}${data2.current_units.temperature_2m}`,
    );
  } catch (error) {
    console.log("Error fetching:", error);
  }
};

runningSameTime();
