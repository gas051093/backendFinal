import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { jwtAuth } from "../middlewares/passportAuth.middleware.js";
import { cartOwner } from "../middlewares/cartOwner.middleware.js";
import { role } from "../middlewares/role.middleware.js";

const router = Router();

router.get("/", jwtAuth, authMiddleware, CartController.getCart);
router.get("/all", jwtAuth, authMiddleware,role(["admin"]), CartController.allCarts);
router.post( "/:cid/product/:pid",jwtAuth,cartOwner,authMiddleware,role(["user"]),CartController.addProduct);
router.delete(
  "/:cid/product/:pid",
  jwtAuth,
  authMiddleware,
  cartOwner,
  role(["user"]),
  CartController.removeProduct
);

export default router;
