import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { checkRolesExisted } from "../middlewares/verifySignup";

const router = Router()

router.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.post('/register', checkRolesExisted, register)

router.post('/login', login)

export default router;