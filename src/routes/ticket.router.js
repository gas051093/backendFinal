import { Router } from "express";
import TicketController from "../controllers/ticket.controller.js";
import { role } from "../middlewares/role.middleware.js";
import { jwtAuth } from "../middlewares/passportAuth.middleware.js";

const router = Router();

router.post(
  "/:cid",
  jwtAuth,
  role(["user"]),
  TicketController.checkout
);

export default router;
