import express from "express";
import { CompilerController, LogoutController } from "../controllers/WorkController.js";
import { RunController, OptimiseController } from "../controllers/ServiceController.js";

const WorkRoute = express.Router();

WorkRoute.get("/compiler", CompilerController);

WorkRoute.get("/logout", LogoutController);

WorkRoute.post('/run', RunController);

WorkRoute.post("/optimise", OptimiseController);

export default WorkRoute;