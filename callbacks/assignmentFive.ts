//Pizza Order

type orderStatusFunction = (status: string) => void;

const orderPizza = (orderStatus: orderStatusFunction): void => {
  console.log(
    "You have ordered a pizza! Your pizza will be ready in record time!",
  );
  setTimeout(() => {
    orderStatus("Your pizza is ready! Told you!");
  }, 3000);
  setTimeout(() => {
    orderStatus(
      "Please come and get your pizza.. it also gets cold in record time..",
    );
  }, 6000);
};

const orderStatus = (status: string): void => {
  console.log(status);
};

orderPizza(orderStatus);
