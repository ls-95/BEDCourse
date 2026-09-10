const randomBrewery = async () => {
  try {
    const response = await fetch(
      "https://api.openbrewerydb.org/v1/breweries/random",
    );
    if (!response.ok) {
      throw new Error("Fetching didn't work.");
    }
    const data = await response.json();
    if (!data[0].name) {
      throw new Error("Fetching failed.");
    }
    console.log(
      `Random Brewery to checkout: ${data[0].name}. Location: ${data[0].address_1}, ${data[0].city} ${data[0].postal_code}, ${data[0].state_province}, ${data[0].country}.`,
    );
  } catch (error) {
    console.log(error);
  }
};

randomBrewery();
