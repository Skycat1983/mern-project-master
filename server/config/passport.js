import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import usersModel from "../models/usersModel.js";

// var JwtStrategy = require("passport-jwt").Strategy,
// ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.WEB_TOKEN_KEY,
};

const jwtStrategy = new JwtStrategy(opts, function (jwt_payload, done) {
  console.log("jwt_payload :>> ", jwt_payload);
  usersModel.findOne({ _id: jwt_payload.sub }, function (err, user) {
    if (err) {
      console.log("err :>> ", err);
      return done(err, false);
    }
    if (user) {
      console.log("user in passport>>>>>", user);
      // if (user.isLoggedIn) {
      return done(null, user);
      // } else {
      //   return done(null, false);
      // }
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
});

// function takes middleware as param, and on it we use the strat outlined above
const passportConfig = (passport) => {
  passport.use(jwtStrategy);
};

export default passportConfig;

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = "secret";
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
// passport.use(
//   new JwtStrategy(opts, function (jwt_payload, done) {
//     User.findOne({ id: jwt_payload.sub }, function (err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     });
//   })
// );
