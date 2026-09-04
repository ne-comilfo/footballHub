import { Router } from "express";
import * as favorites from "../controllers/favoritesController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.use(requireAuth);

router.get("/", favorites.list);
router.post("/", favorites.add);
router.delete("/:kind/:entityId", favorites.remove);

export default router;
