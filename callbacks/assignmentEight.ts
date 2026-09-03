//Success and Error Callback
type SuccessFunction = (message: string) => void;
type ErrorFunction = (message: string) => void;

const callRandomFunction = (
  success: SuccessFunction,
  error: ErrorFunction,
): void => {
  let randomNumber = Math.random();
  randomNumber < 0.5 ? success("Success!") : error("Error!");
};

const success = (message: string): void => {
  console.log(message);
};

const error = (message: string): void => {
  console.log(message);
};

callRandomFunction(success, error);
