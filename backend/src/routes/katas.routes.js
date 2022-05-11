import { Router } from "express";
import { createKata, getAllKatas, getKataById, updateKataById, deleteKataByID } from "../controllers/katas.controller";
import { verifyToken, isAdmin } from "../middlewares/authJwt";



const router = Router()

router.get('/', getAllKatas)

  

router.get('/:kataId', getKataById)

router.post('/', verifyToken, isAdmin, createKata)

router.put('/:kataId', verifyToken, updateKataById)

router.delete('/:kataId', verifyToken, deleteKataByID)

export default router;