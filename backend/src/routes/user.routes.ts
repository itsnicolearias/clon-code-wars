import { Router } from "express";
import { getAllUsers, getUserById, updateUserById, deleteUserById, createUser } from "../controllers/user.controller";
import { verifyToken, isAdmin } from "../middlewares/authJwt";
import { checkRolesExisted } from "../middlewares/verifySignup";

const router = Router()

router.get('/', verifyToken, isAdmin, getAllUsers)

router.get('/:userId', verifyToken, isAdmin, getUserById)

router.post('/', verifyToken, isAdmin, checkRolesExisted, createUser)

router.put('/:userId', verifyToken, isAdmin, updateUserById)

router.delete('/:userId', verifyToken, isAdmin, deleteUserById)

export default router;