//Chained Callbacks
type StepDoneFunction = (message: string) => void;

const printStepOne = (stepOneDone: StepDoneFunction): void => {
  setTimeout(() => {
    stepOneDone("Step 1 Done");
  }, 1000);
};

const printStepTwo = (stepTwoDone: StepDoneFunction): void => {
  setTimeout(() => {
    stepTwoDone("Step 2 Done");
  }, 1000);
};

const printStepThree = (stepThreeDone: StepDoneFunction): void => {
  setTimeout(() => {
    stepThreeDone("Step 3 Done");
  }, 1000);
};

const stepOneDone = (message: string): void => {
  console.log(message);
  printStepTwo(stepTwoDone);
};

const stepTwoDone = (message: string): void => {
  console.log(message);
  printStepThree(stepThreeDone);
};

const stepThreeDone = (message: string): void => {
  console.log(message);
};

printStepOne(stepOneDone);
