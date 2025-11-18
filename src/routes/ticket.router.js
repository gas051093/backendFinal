import { Router } from "express";
import TicketController from "../controllers/ticket.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { role } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/:cid",
  authMiddleware,
  role(["user"]),
  TicketController.checkout
);

export default router;
