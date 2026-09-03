//Pizza Order

type orderStatusFunction = (status: string) => void;

const orderPizza = (orderStatus: orderStatusFunction): void => {
  setTimeout(() => {
    orderStatus("Your pizza is ready!");
  }, 3000);
};

const orderStatus = (status: string): void => {
  console.log(status);
};

orderPizza(orderStatus);
