// Resolve or Reject¨

const myPromise = new Promise((resolved, reject) => {
  const success: boolean = true;

  if (success) {
    resolved("Resolved operation successfully!");
  } else {
    reject("Resolved operation rejected!");
  }
});

const result = async (): Promise<void> => {
  try {
    const message = await myPromise;
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

result();
