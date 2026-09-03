//Multiple Messages
type DisplayMessageFunction = (message: string) => void;

const messages = (displayMessage: DisplayMessageFunction): void => {
  const messageList: string[] = ["Hello", "World", "Wassup"];
  messageList.forEach((m) => displayMessage(m));
};

const displayMessage = (message: string): void => {
  console.log(message);
};

messages(displayMessage);
