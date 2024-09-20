import express from "express";
import { LoginController, SignupController } from "../controllers/AuthController.js";
import { LoginValidation, SignupValidation } from "../middlewares/AuthValidation.js";

const AuthUserRoute = express.Router();

AuthUserRoute.post("/signup", SignupValidation, SignupController)

AuthUserRoute.post("/login", LoginValidation, LoginController)

export default AuthUserRoute;