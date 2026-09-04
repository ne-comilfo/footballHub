import { Router } from "express";
import authRouter from "./auth";
import favoritesRouter from "./favorites";
import matchesRouter from "./matches";
import playersRouter from "./players";
import teamsRouter from "./teams";

const router = Router();

router.use("/auth", authRouter);
router.use("/favorites", favoritesRouter);
router.use("/teams", teamsRouter);
router.use("/players", playersRouter);
router.use("/matches", matchesRouter);

export default router;
