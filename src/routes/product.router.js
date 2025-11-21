import { Router } from "express";
import ProductController from "../controllers/product.controller.js";
import { role } from "../middlewares/role.middleware.js";
import { jwtAuth } from "../middlewares/passportAuth.middleware.js";

const router = Router();

router.get("/", ProductController.list);
router.get("/:pid", ProductController.getOne);
router.post("/",jwtAuth, role(["admin"]), ProductController.create);
router.put("/:pid", jwtAuth, role(["admin"]), ProductController.update);
router.delete(
  "/:pid",jwtAuth,
  role(["admin"]),
  ProductController.delete
);

export default router;
