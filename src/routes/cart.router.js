import { Router } from "express";
import CartController from "../controllers/cart.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { role } from "../middlewares/role.middleware.js";

const router = Router();

router.get("/:cid", authMiddleware, CartController.getCart);
router.post(
  "/:cid/product/:pid",
  authMiddleware,
  role(["user"]),
  CartController.addProduct
);
router.delete(
  "/:cid/product/:pid",
  authMiddleware,
  role(["user"]),
  CartController.removeProduct
);

export default router;
