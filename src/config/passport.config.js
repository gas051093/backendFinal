import passport from "passport";
import LocalStrategy from "passport-local";
import JwtStrategy from "passport-jwt";
import UserService from "../services/user.service.js";
import CartService from '../services/cart.service.js'
import { createHash, isValidatePassword } from "../utils/index.js";
import envs from "./envs.js";

const userService = new UserService();
const cartService = new CartService();
const Local = LocalStrategy.Strategy;
const JWT = JwtStrategy.Strategy;
const ExtractJwt = JwtStrategy.ExtractJwt;
const secretOrKey = envs.JWT_SECRET
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies["authCookie"];
  return token;
};

export const initializePassport = () => {
  passport.use(
    "register",
    new Local(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const exist = await userService.getUserByEmail(email);
          if (exist) return done(null, false, { message: "Email en uso" });
          const newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email,
            age: req.body.age,
            password: createHash(password),
          };

          const user = await userService.createUser(newUser);
          const cart = await cartService.createCart({ user: user._id })
          const userWithCart = await userService.updateUser(user._id, {cart: cart._id})
          return done(null, userWithCart);
        } catch (err) {
          return done(null, false, { message: err.message });
        }
      }
    )
  );

  passport.use(
    "login",
    new Local({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await userService.getUserByEmail(email);
        if (!user)
          return done(null, false, { message: "Usuario no encontrado" });

        const valid = isValidatePassword(password, user.password);
        if (!valid)
          return done(null, false, { message: "Credenciales inválidas" });

        return done(null, user);
      } catch (err) {
         return done(null, false, { message: err.message });
      }
    })
  );

  passport.use(
    "jwt",
    new JWT(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([
          cookieExtractor,
          ExtractJwt.fromAuthHeaderAsBearerToken(),
        ]),
        secretOrKey,
      },
      async (jwt_payload, done) => {
        try {
          const user = await userService.getUserById(jwt_payload.id);
          return done(null, user || false);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userService.getUserById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
