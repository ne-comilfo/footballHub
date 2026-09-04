import { Router } from "express";
import authRouter from "./auth";
import matchesRouter from "./matches";
import playersRouter from "./players";
import teamsRouter from "./teams";

const router = Router();

router.use("/auth", authRouter);
router.use("/teams", teamsRouter);
router.use("/players", playersRouter);
router.use("/matches", matchesRouter);

export default router;
