import express from "express";
import { Register, signin, update } from "../handlers/userHandler";
import {
  requestPassword,
  verifyUser,
  changepassword,
} from "../handlers/userHandler/userHandler";
import { auth } from "../middleware/auth/auth";
import {
  loginUserJoi,
  RegisterUserJoi,
  updateUserJoi,
  changePasswordJoi,
} from "../utils/joi-validator";
import { sendemailTokenJoi } from "../utils/joi-validator/schema";
export const usersRoute = express.Router();
/**
 * @swagger
 * /api/user:
 *   post:
 *     description: Testing for get api
 *     responses:
 *       200:
 *         description: Returns User Object
 */

usersRoute.post("/signup", RegisterUserJoi, Register);
usersRoute.post("/signin", loginUserJoi, signin);
usersRoute.patch("/update", updateUserJoi, auth, update);
usersRoute.post("/resetpassword", sendemailTokenJoi, requestPassword);
usersRoute.patch("/verify/:token", verifyUser);
usersRoute.post("/changepassword", changePasswordJoi, changepassword);
