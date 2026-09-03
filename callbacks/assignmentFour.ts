//Uppercase Callback

// type sentenceFunction = (sentence: string) => void;

// const transformToUpperCase = (sentence: sentenceFunction): void => {
//   sentence("hello world");
// };

// const sentence = (sentence: string): void => {
//   console.log(sentence.toLocaleUpperCase());
// };

// transformToUpperCase(sentence);

type DisplaySentenceFunction = (sentence: string) => void;

const transformToUpperCase = (
  sentence: string,
  displaySentence: DisplaySentenceFunction,
): void => {
  displaySentence(sentence.toUpperCase()); //Global Unicode mapping
  // dislpaySentence(sentence.toLocaleUpperCase("fr-FR")); -> checks locale rule first if should override global mapping - fr-FR for french
};

const displaySentence = (sentence: string): void => {
  console.log(sentence);
};

transformToUpperCase(
  "Bonjour, comment ça va? Je vais bien merci, je vais au marché aujourd'hui",
  displaySentence,
);
