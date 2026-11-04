# Easy

## Exercise 1:

Number 3:

In the terminal, it shows an error at PizzaSchema.parse() and the zod error states in the message: "Invalid input: expected number, received undefined".

PizzaTypeSchema passed as "vegetarian" is now a valid type but it is not in the menu yet so the PizzaSchema stopped it as there is no price declared meaning it is undefined.

TS checks the code in the editor, which is the red line under menu[pizzaType]. When the code runs, TS is removed and only plain JS is left, that is why Vitest still ran the code even though there was a red line. Zod then checks the real values when the program runs.

Number 5:

orderPizza("vegetarian") that returns true belongs in pizzashop.integration.test as it tests serveral functions working together and not just one function on its own.