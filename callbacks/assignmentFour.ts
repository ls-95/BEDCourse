//Uppercase Callback

// type sentenceFunction = (sentence: string) => void;

// const transformToUpperCase = (sentence: sentenceFunction): void => {
//   sentence("hello world");
// };

// const sentence = (sentence: string): void => {
//   console.log(sentence.toLocaleUpperCase());
// };

// transformToUpperCase(sentence);

type displaySentenceFunction = (sentence: string) => void;

const transformToUpperCase = (
  sentence: string,
  dislpaySentence: displaySentenceFunction,
): void => {
  dislpaySentence(sentence.toLocaleUpperCase());
};

const dislpaySentence = (sentence: string): void => {
  console.log(sentence);
};

transformToUpperCase("hello world", dislpaySentence);
