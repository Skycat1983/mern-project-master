const coversArray = [];
const profilePicsArray = [];

export const getRndInteger = (min, max) => {
  let result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
  // return Math.floor(Math.random() * (max - min)) + min;
};
