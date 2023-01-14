export const getRndInteger = (min, max) => {
  let result = Math.floor(Math.random() * (max - min)) + min;
  return result;
  // return Math.floor(Math.random() * (max - min)) + min;
};
