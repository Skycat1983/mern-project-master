import jsonWebToken from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const issueToken = (userId) => {
  //! no sensitive details in payload
  const payload = {
    sub: userId,
  };

  //* options can also travel with payload but keyword shortforms must be used, for example 'aud', 'sub', 'iss'.
  const options = {
    expiresIn: "1 day",
  };
  const secretOrPrivateKey = process.env.WEB_TOKEN_KEY;

  const token = jsonWebToken.sign(
    payload,
    secretOrPrivateKey,
    //* options OR callback. with cb "const token = issueToken(existingUser._id);" would need to be async
    options
  );

  return token;
};

export default issueToken;
