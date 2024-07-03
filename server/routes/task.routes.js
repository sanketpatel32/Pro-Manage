import express from "express";
import {
    createTask,
    deleteTask,
    editTask,
    getAllTask,
    getAnalytics,
    getTask,
    updateChecklistById
} from "../controllers/task.js";
import protectRoute from "../middleware/protectRoute.js"

const router = express.Router();

router.get("/getTask", protectRoute, getAllTask);
router.post("/createTask", protectRoute, createTask);
router.get("/analytics", protectRoute, getAnalytics);

router.patch("/:taskId/checklist/:checklistId", updateChecklistById);
 
router.get("/single/:taskId", getTask);
router.patch("/single/:taskId", protectRoute, editTask);
router.delete("/single/:taskId", protectRoute, deleteTask);

export default router;