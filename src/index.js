import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import envs from "./config/envs.js";
import { initializePassport } from "./config/passport.config.js";
import connectDb from "./config/db.config.js";

import userRoutes from "./routes/user.router.js";
import productRoutes from "./routes/product.router.js";
import cartRoutes from "./routes/cart.router.js";
import ticketRoutes from "./routes/ticket.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// passport
initializePassport();
app.use(passport.initialize());

// routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/purchase", ticketRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: "Ruta no encontrada" }));

connectDb(envs.URLMONGO, envs.DBNAME);

app.listen(envs.PORT, () => {
  console.log(`Server online en -> http://localhost:${envs.PORT}`);
});
