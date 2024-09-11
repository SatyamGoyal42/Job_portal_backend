import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/userController.js";

const router = express.Router();

// update, put
router.put('/update-user',userAuth,updateUserController);

// get users, get


export default router