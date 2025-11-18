import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { role } from "../middlewares/role.middleware.js";

const router = Router();

router.get("/", ProductController.list);
router.get("/:pid", ProductController.getOne);
router.post("/", authMiddleware, role(["admin"]), ProductController.create);
router.put("/:pid", authMiddleware, role(["admin"]), ProductController.update);
router.delete(
  "/:pid",
  authMiddleware,
  role(["admin"]),
  ProductController.delete
);

export default router;
