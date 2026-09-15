import express from "express";

const app = express();
const PORT = 3000;
app.use(express.json());

//Task ONE   -  Status code should and does show 200 OK, if not found it would show 404 NOT FOUND
app.get("/", (req, res) => {
  res.send("Welcome to Formula One!");
});

//Task TWO   -  Status code should and does show 200 OK, if not found it would show 404 NOT FOUND
app.get("/introduction", (req, res) => {
  res.json({
    sport: "Formula One",
    season: 2026,
    categories: {
      teams: [
        {
          name: "Mercedes",
          drivers: [
            { name: "George Russell", age: 28, nationality: "United Kingdom" },
            { name: "Kimi Antonelli", age: 20, nationality: "Italy" },
          ],
        },
        {
          name: "Ferrari",
          drivers: [
            { name: "Charles Leclerc", age: 28, nationality: "Monaco" },
            { name: "Lewis Hamilton", age: 41, nationality: "United Kingdom" },
          ],
        },
        {
          name: "McLaren",
          drivers: [
            { name: "Lando Norris", age: 26, nationality: "United Kingdom" },
            { name: "Oscar Piastri", age: 25, nationality: "Australia" },
          ],
        },
        {
          name: "Red Bull Racing",
          drivers: [
            { name: "Max Verstappen", age: 28, nationality: "Netherlands" },
            { name: "Isack Hadjar", age: 21, nationality: "France" },
          ],
        },
        {
          name: "Racing Bulls",
          drivers: [
            { name: "Liam Lawson", age: 24, nationality: "New Zealand" },
            { name: "Arvid Lindblad", age: 19, nationality: "United Kingdom" },
          ],
        },
        {
          name: "Alpine",
          drivers: [
            { name: "Pierre Gasly", age: 30, nationality: "France" },
            { name: "Franco Colapinto", age: 23, nationality: "Argentina" },
          ],
        },
        {
          name: "Haas",
          drivers: [
            { name: "Esteban Ocon", age: 29, nationality: "France" },
            { name: "Oliver Bearman", age: 21, nationality: "United Kingdom" },
          ],
        },
        {
          name: "Audi",
          drivers: [
            { name: "Nico Hülkenberg", age: 39, nationality: "Germany" },
            { name: "Gabriel Bortoleto", age: 21, nationality: "Brazil" },
          ],
        },
        {
          name: "Williams",
          drivers: [
            { name: "Carlos Sainz Jr", age: 32, nationality: "Spain" },
            { name: "Alex Albon", age: 30, nationality: "Thailand" },
          ],
        },
        {
          name: "Aston Martin",
          drivers: [
            { name: "Fernando Alonso", age: 45, nationality: "Spain" },
            { name: "Lance Stroll", age: 27, nationality: "Canada" },
          ],
        },
        {
          name: "Cadillac",
          drivers: [
            { name: "Sergio Perez", age: 36, nationality: "Mexico" },
            { name: "Valtteri Bottas", age: 37, nationality: "Finland" },
          ],
        },
      ],
      races: [
        {
          name: "Australian Grand Prix",
          date: "March 6–8",
        },
        {
          name: "Chinese Grand Prix",
          date: "March 13–15",
        },
        {
          name: "Japanese Grand Prix",
          date: "March 27–29",
        },
        {
          name: "Miami Grand Prix",
          date: "May 1–3",
        },
        {
          name: "Canada Grand Prix",
          date: "May 22–24",
        },
        {
          name: "Monaco Grand Prix",
          date: "June 5–7",
        },
        {
          name: "Barcelona Grand Prix",
          date: "June 12–14",
        },
        {
          name: "Austrian Grand Prix",
          date: "June 26–28",
        },
        {
          name: "British Grand Prix",
          date: "July 3–5",
        },
        {
          name: "Belgian Grand Prix",
          date: "July 17–19",
        },
        {
          name: "Hungarian Grand Prix",
          date: "July 24–26",
        },
        {
          name: "Dutch Grand Prix",
          date: "August 21–23",
        },
        {
          name: "Italian Grand Prix (Monza)",
          date: "September 4–6",
        },
        {
          name: "Madrid Grand Prix",
          date: "September 11–13",
        },
        {
          name: "Azerbaijan Grand Prix",
          date: "September 24–26",
        },
        {
          name: "Bahrain Grand Prix",
          date: "October 2–4",
        },
        {
          name: "Singapore Grand Prix",
          date: "October 9–11",
        },
        {
          name: "Austin Grand Prix",
          date: "October 23–25",
        },
        {
          name: "Mexico City Grand Prix",
          date: "October 30–November 1",
        },
        {
          name: "São Paulo Grand Prix (Brazil)",
          date: "November 6–8",
        },
        {
          name: "Las Vegas Grand Prix",
          date: "November 19–21",
        },
        {
          name: "Qatar Grand Prix",
          date: "November 27–29",
        },
        {
          name: "Abu Dhabi Grand Prix",
          date: "December 4–6",
        },
      ],
      driversStandings: [
        {
          position: 1,
          driver: "Kimi Antonelli",
          team: "Mercedes",
          points: 292,
          wins: 8,
        },
        {
          position: 2,
          driver: "George Russell",
          team: "Mercedes",
          points: 211,
          wins: 2,
        },
        {
          position: 3,
          driver: "Lewis Hamilton",
          team: "Ferrari",
          points: 191,
          wins: 1,
        },
        {
          position: 4,
          driver: "Lando Norris",
          team: "McLaren",
          points: 186,
          wins: 2,
        },
        {
          position: 5,
          driver: "Charles Leclerc",
          team: "Ferrari",
          points: 167,
          wins: 1,
        },
        {
          position: 6,
          driver: "Max Verstappen",
          team: "Red Bull Racing",
          points: 145,
          wins: 0,
        },
        {
          position: 7,
          driver: "Oscar Piastri",
          team: "McLaren",
          points: 120,
          wins: 0,
        },
        {
          position: 8,
          driver: "Isack Hadjar",
          team: "Red Bull Racing",
          points: 71,
          wins: 0,
        },
        {
          position: 9,
          driver: "Liam Lawson",
          team: "Red Bull Racing",
          points: 59,
          wins: 0,
        },
        {
          position: 10,
          driver: "Pierre Gasly",
          team: "Alpine",
          points: 41,
          wins: 0,
        },
      ],
    },
    lastUpdated: new Date().toISOString().split("T")[0],
  });
});

//Task THREE   -  Status code should and does show 200 OK, if not found it would show 404 NOT FOUND

/*
  Both routes work in Insomnia both returning a 200 status code.
*/

//Task FOUR   -  Status code should and does show 200 OK, if not found it would show 404 NOT FOUND

/*
  app.get("/about", (req, res) => {
    res.json({
      title: "Formula One",
      description:
      "Formula One (commonly known as F1) is the highest class of international open-wheel racing managed by the Fédération Internationale de l'Automobile (FIA). It features the world's fastest regulated road-course racing cars competing globally in a series of events known as Grands Prix.",
      founded: 1946,
      firstWordChampionship: 1950,
      firstWorldChampion: "Giuseppe 'Nino' Farina",
      funFact:
        "An F1 car generates so much aerodynamic downforce at high speeds that it could theoretically drive upside down on the ceiling of a tunnel once it crosses 150 mph (240 km/h) without falling.",
    });
  });
*/

//Task FIVE   -  Status code should and does show 200 OK, if not found it would show 404 NOT FOUND
app.get("/message", (req, res) => {
  res.send("Hello from the other side!");
});

/*
  res.send() doesnt do any automatic JSON stringification, its used to send different types of data without saying its JSON. Whereas res.json() automatically runs all body parameters through JSON.stringify(), turning them into JSON formatted strings. So when we just want to send a simple string, the best way is to simply use res.send().
*/

//Task SIX

/*
  See comments above for each route - lines: 7, 12, 268, 274, 291
  Created a route requst for http://localhost:3000/hello, and as expected the status code is 404 NOT FOUND
*/

//Task SEVEN

/*
  "/about" route. Changed it and set a status using res.status(200).json() and the output was the same, status code still showing 200:
*/

app.get("/about", (req, res) => {
  res.status(200).json({
    title: "Formula One",
    description:
      "Formula One (commonly known as F1) is the highest class of international open-wheel racing managed by the Fédération Internationale de l'Automobile (FIA). It features the world's fastest regulated road-course racing cars competing globally in a series of events known as Grands Prix.",
    founded: 1946,
    firstWordChampionship: 1950,
    firstWorldChampion: "Giuseppe 'Nino' Farina",
    funFact:
      "An F1 car generates so much aerodynamic downforce at high speeds that it could theoretically drive upside down on the ceiling of a tunnel once it crosses 150 mph (240 km/h) without falling.",
  });
});

//Task EIGHT

app.get("/maintenance", (req, res) => {
  res.status(503).send("We're down for maintenance, check back soon!");
});

/*
  In Scripts => After-response, added this code to see 503 status code:

  insomnia.test('Check for 503 status', () => {
    insomnia.expect(insomnia.response.status).to.equal(503);
});

*/

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
