import { Router } from "express";
import * as matches from "../controllers/matchesController";

const router = Router();

router.get("/day", matches.day);
router.get("/board", matches.board);

export default router;
