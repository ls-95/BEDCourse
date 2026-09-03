//Download Simulation

type DownloadFunction = (url: string) => void;

const printUrl = (url: string, downloadFunction: DownloadFunction): void => {
  setTimeout(() => {
    downloadFunction(url);
  }, 2000);
};

const downloadFunction = (url: string): void => {
  console.log(`Download data from ${url}`);
};

printUrl(
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1",
  downloadFunction,
);
