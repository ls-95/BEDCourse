import express from "express";

const app = express();
const PORT = 3000;
//middleare
app.use(express.json());

//Task ONE
app.get("/", (req, res) => {
  res.send("Welcome to Formula One!");
});

//Task TWO
app.get("/formula1", (req, res) => {
  res.json({
    sport: "Formula One",
    season: 2026,
    categories: {
      teams: [
        {
          name: "Mercedes",
          drivers: ["George Russell", "Kimi Antonelli"],
        },
        {
          name: "Ferrari",
          drivers: ["Charles Leclerc", "Lewis Hamilton"],
        },
        {
          name: "McLaren",
          drivers: ["Lando Norris", "Oscar Piastri"],
        },
        {
          name: "Red Bull Racing",
          drivers: ["Max Verstappen", "Isack Hadjar"],
        },
        {
          name: "Racing Bulls",
          drivers: ["Liam Lawson", "Arvid Lindblad"],
        },
        {
          name: "Alpine",
          drivers: ["Pierre Gasly", "Franco Colapinto"],
        },
        {
          name: "Haas",
          drivers: ["Esteban Ocon", "Oliver Bearman"],
        },
        {
          name: "Audi",
          drivers: ["Nico Hülkenberg", "Gabriel Bortoleto"],
        },
        {
          name: "Williams",
          drivers: ["Carlos Sainz Jr", "Alex Albon"],
        },
        {
          name: "Aston Martin",
          drivers: ["Fernando Alonso", "Lance Stroll"],
        },
        {
          name: "Cadillac",
          drivers: ["Sergio Perez", "Valtteri Bottas"],
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
          driver: "Andrea Kimi Antonelli",
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Task THREE - both routes work in Insomnia both returning a 200 status code.
