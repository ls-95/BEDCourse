//Uppercase Callback

type sentenceFunction = (sentence: string) => void;

const transformToUpperCase = (sentence: sentenceFunction): void => {
  sentence("hello world");
};

const sentence = (sentence: string): void => {
  console.log(sentence.toLocaleUpperCase());
};

transformToUpperCase(sentence);
