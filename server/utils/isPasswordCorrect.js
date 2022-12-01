import bcrypt from "bcrypt";

const isPasswordCorrect = async (password, hashedPassword) => {
  console.log("password :>> ", password, hashedPassword);
  const verified = bcrypt.compare(password, hashedPassword);
  return verified;
};

export default isPasswordCorrect;
