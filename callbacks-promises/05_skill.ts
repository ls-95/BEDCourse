//A Different Advice Slip

type AdviceSlipType = {
  slip: {
    id: number;
    advice: string;
  };
};

const fetchAdviceAndLog = (id: number): void => {
  fetch(`https://api.adviceslip.com/advice/${id}`)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Fetching did not work");
      }
      return response.json();
    })
    .then((data: AdviceSlipType) => {
      const advice = data.slip.advice;
      console.log(`Advice id ${id}: ${advice}`);
    })
    .catch((error) => {
      console.log("Error fetching advice", error);
    });
};

fetchAdviceAndLog(1);
fetchAdviceAndLog(15);
fetchAdviceAndLog(30);

//Another different one:

type UselessfactsType = {
  text: string;
};

type UrlEnding = "random" | "today";

const fetchFactAndLog = (word: UrlEnding): void => {
  fetch(`https://uselessfacts.jsph.pl/api/v2/facts/${word}`)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Fetching did not work");
      }
      return response.json();
    })
    .then((data: UselessfactsType) => {
      const fact = data.text;
      console.log(
        `${word === "random" ? "The useless random fact is: " : "The useless fact today is: "} ${fact}`,
      );
    })
    .catch((error) => {
      console.log("Error fetching advice", error);
    });
};

fetchFactAndLog("random");
fetchFactAndLog("today");

//Handling a Bad Request

type AdviceSlip2Type = {
  slip: {
    id: number;
    advice: string;
  };
  message?: {
    type: string;
    text: string;
  };
};

const fetchAdviceAndLog2 = (id: number): void => {
  fetch(`https://api.adviceslip.com/advice/${id}`)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Fetching did not work");
      }
      return response.json();
    })
    .then((data: AdviceSlip2Type) => {
      if (!data.slip) {
        console.log("Something went wrong");
        throw new Error(data.message?.text);
      }
      const advice = data.slip.advice;
      console.log(`Advice id ${id}: ${advice}`);
    })
    .catch((error) => {
      console.log("Error fetching advice", error);
    });
};

fetchAdviceAndLog2(99999999);

/*
I added another if statment as 'slip' wouldnt exist with that id. I logged the data to see the response. I added it to the type. I did manage to get this in the terminal:

  Something went wrong 
  Error fetching advice Error: Advice slip not found.
    at C:\repos\BEDCourse\callbacks-promises\05_skill.ts:83:15
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)

I am unsure if I did the assignment correctly as I'm not sure if this is meant to be the output.
*/

//Challenge (optional): A Second API Type

type JokeType = {
  value: string;
};

const fetchJoke = (): void => {
  fetch("https://api.chucknorris.io/jokes/random")
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Fetching did not work");
      }
      return response.json();
    })
    .then((data: JokeType) => {
      const joke = data.value;
      console.log(`Here is a random Chuck Norris joke: ${joke}`);
    })
    .catch((error) => {
      console.log("Error fetching joke", error);
    });
};

fetchJoke();

/* Summary

I had a bit of a hard time trying to figure out what some of the assignments were asking for and got pretty confused by the instructions, definitely more than the previous ones. Because of that, it ended up taking me quite a long time to get through it all.

With my dyslexia, understanding exactly what's asked can be a challenge for me when the assignments get a bit more complex, so I just wanted to share my feedback since I struggled a bit with this one!


*/
