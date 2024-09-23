import { Router } from "express";
import {
  createTask,
  getTasks,
  getUserTask,
  updateTask,
} from "../controllers/task.controller";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateTask);
router.get("/users/:userId", getUserTask);

export default router;
