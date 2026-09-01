//Colour Picker
enum Colour {
  Red = "Red",
  Green = "Green",
  Blue = "Blue",
}

const showColour = (colour: Colour) => {
  return `You chose ${colour}`;
};

console.log(showColour(Colour.Red));
console.log(showColour(Colour.Green));
console.log(showColour(Colour.Blue));

//Pizza Order
enum PizzaSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

const orderPizza = (pizzaSize: PizzaSize) => {
  return `You ordered a ${pizzaSize} pizza`;
};

console.log(orderPizza(PizzaSize.Small));
console.log(orderPizza(PizzaSize.Medium));
console.log(orderPizza(PizzaSize.Large));

enum PizzaSizes {
  Small,
  Medium,
  Large,
}

const orderPizzas = (pizzaSizes: PizzaSizes) => {
  return pizzaSizes === PizzaSizes.Small
    ? console.log("You have ordered a small pizza")
    : pizzaSizes === PizzaSizes.Medium
      ? console.log("You have ordered a medium pizza")
      : console.log("You have ordered a small pizza");
};

orderPizzas(PizzaSizes.Large);
orderPizzas(PizzaSizes.Medium);
orderPizzas(PizzaSizes.Small);

//Challenge (optional) Role-Based Access
enum Role {
  Admin,
  User,
  Guest,
}

const printRole = (role: Role) => {
  switch (role) {
    case Role.Admin:
      console.log("You have full access");
      break;
    case Role.User:
      console.log("You have limited access");
      break;
    case Role.Guest:
      console.log("You have guest access");
      break;
    default:
      console.log("You do not have access");
      break;
  }
};

printRole(Role.Admin);
printRole(Role.User);
printRole(Role.Guest);
