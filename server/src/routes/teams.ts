import { Router } from "express";
import * as teams from "../controllers/teamsController";

const router = Router();

router.get("/popular", teams.popular);
router.get("/", teams.list);
router.get("/:id", teams.detail);
router.get("/:id/squad", teams.squad);
router.get("/:id/stats", teams.stats);
router.get("/:id/fixtures", teams.fixtures);

export default router;
