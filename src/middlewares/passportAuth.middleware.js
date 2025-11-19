import passport from "passport";

export const registerAuth = (req, res, next) => {
  passport.authenticate("register", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: info?.message || "Error en el registro",
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};
export const loginAuth = (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: info?.message || "Error en el login",
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};
export const jwtAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "No autorizado",
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};
