import { Router } from "express";
import * as auth from "../controllers/authController";
import { loginRateLimit, registerRateLimit } from "../middleware/rateLimit";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.post("/register", registerRateLimit, auth.registerUser);
router.post("/login", loginRateLimit, auth.loginUser);
router.post("/refresh", auth.refreshSession);
router.post("/logout", auth.logoutUser);
router.get("/me", requireAuth, auth.me);

export default router;
