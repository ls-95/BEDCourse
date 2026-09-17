import express from "express";

const app = express();
const PORT: number = 3000;

app.use(express.json());

type Drivers = {
  id: number;
  name: string;
  team: string;
  number: number;
  nationality: string;
  wins: number;
};

type DiversParams = {
  id: string;
};

let drivers: Drivers[] = [
  {
    id: 1,
    name: "Kimi Antonelli",
    team: "Mercedes",
    number: 12,
    nationality: "Italy",
    wins: 8,
  },
  {
    id: 2,
    name: "George Russel",
    team: "Mercedes",
    number: 63,
    nationality: "United Kingdom",
    wins: 2,
  },
  {
    id: 3,
    name: "Charles Leclerc",
    team: "Ferrari",
    number: 16,
    nationality: "Monaco",
    wins: 1,
  },
  {
    id: 4,
    name: "Lewis Hamilton",
    team: "Ferrari",
    number: 44,
    nationality: "United Kingdom",
    wins: 1,
  },
  {
    id: 5,
    name: "Lando Norris",
    team: "McLaren",
    number: 1,
    nationality: "United Kingdom",
    wins: 2,
  },
  {
    id: 6,
    name: "Oscar Piastri",
    team: "McLaren",
    number: 81,
    nationality: "Australia",
    wins: 0,
  },
  {
    id: 7,
    name: "Max Verstappen",
    team: "Red Bull Racing",
    number: 3,
    nationality: "Netherlands",
    wins: 0,
  },
  {
    id: 8,
    name: "Isack Hadjar",
    team: "Red Bull Racing",
    number: 6,
    nationality: "France",
    wins: 0,
  },
  {
    id: 9,
    name: "Liam Lawson",
    team: "Racing Bulls",
    number: 30,
    nationality: "New Zealand",
    wins: 0,
  },
  {
    id: 10,
    name: "Arvid Lindblad",
    team: "Racing Bulls",
    number: 41,
    nationality: "United Kingdom",
    wins: 0,
  },
  {
    id: 11,
    name: "Pierre Gasly",
    team: "Alpine",
    number: 10,
    nationality: "France",
    wins: 0,
  },
  {
    id: 12,
    name: "Franco Colapinto",
    team: "Alpine",
    number: 43,
    nationality: "Argentina",
    wins: 0,
  },
  {
    id: 13,
    name: "Nico Hülkenberg",
    team: "Audi",
    number: 27,
    nationality: "Germany",
    wins: 0,
  },
  {
    id: 14,
    name: "Gabriel Bortoleto",
    team: "Audi",
    number: 5,
    nationality: "Brazil",
    wins: 0,
  },
  {
    id: 15,
    name: "Carlos Sainz Jr",
    team: "Williams",
    number: 55,
    nationality: "Spain",
    wins: 0,
  },
  {
    id: 16,
    name: "Alex Albon",
    team: "Williams",
    number: 23,
    nationality: "Thailand",
    wins: 0,
  },
  {
    id: 17,
    name: "Esteban Ocon",
    team: "Haas",
    number: 31,
    nationality: "France",
    wins: 0,
  },
  {
    id: 18,
    name: "Oliver Bearman",
    team: "Haas",
    number: 87,
    nationality: "United Kingdom",
    wins: 0,
  },
  {
    id: 19,
    name: "Fernando Alonso",
    team: "Aston Martin",
    number: 14,
    nationality: "Spain",
    wins: 0,
  },
  {
    id: 20,
    name: "Lance Stroll",
    team: "Aston Martin",
    number: 18,
    nationality: "Canada",
    wins: 0,
  },
  {
    id: 21,
    name: "Sergio Perez",
    team: "Cadillac",
    number: 11,
    nationality: "Mexico",
    wins: 0,
  },
  {
    id: 22,
    name: "Valtteri Bottas",
    team: "Cadillac",
    number: 78,
    nationality: "Finland",
    wins: 0,
  },
];

// Task ONE - status code 200
app.get("/drivers", (req, res): void => {
  res.json(drivers);
});

//Task TWO - status code 200

app.post("/drivers", (req, res): void => {
  const newDriver: Drivers = {
    id: drivers.length + 1,
    name: req.body.name,
    team: req.body.team,
    number: req.body.number,
    nationality: req.body.nationality,
    wins: req.body.wins,
  };
  // Task SIX
  if (!newDriver.name || !newDriver.team) {
    res.status(400).json({ message: "Missing information." });
  } else {
    drivers.push(newDriver);
    res
      .status(201) // Task SEVEN
      .json({ message: "New driver added successfully!", driver: newDriver });
  }
});

// Task THREE - both have a status code 200 and both show what they should show.

// Task EIGHT
app.get("/drivers/wins", (req, res) => {
  let result = 0;
  drivers.forEach((d) => (result += d.wins));
  let winningDrivers = drivers.filter((d) => d.wins > 0).map((d) => d.name);
  res.json({
    totalRaceWins: result,
    raceWinners: `${winningDrivers.join(", ")}.`,
  });
});

// Task FOUR

app.put("/drivers/:id", (req, res) => {
  const driverId: number = parseInt(req.params.id);
  const driver: Drivers | undefined = drivers.find((d) => d.id === driverId);
  if (!driver) {
    return res.status(404).json({ message: "Driver not found!" });
  }
  driver.name = req.body.name || driver.name;
  driver.team = req.body.team || driver.team;
  driver.number = req.body.number || driver.number;
  driver.nationality = req.body.nationality || driver.nationality;
  driver.wins = req.body.wins || driver.wins;
  res.json({ message: "Driver update successfully!", driver });
});

// Task FIVE
app.delete("/drivers/:id", (req, res): void => {
  const driverId: number = parseInt(req.params.id);
  drivers = drivers.filter((d) => d.id !== driverId);
  res.json({ message: "Driver deleted successfully! " });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
