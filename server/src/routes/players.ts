import { Router } from "express";
import * as players from "../controllers/playersController";

const router = Router();

router.get("/popular", players.popular);
router.get("/top-scorers", players.topScorers);
router.get("/", players.list);
router.get("/:id", players.detail);

export default router;
