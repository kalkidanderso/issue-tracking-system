import { Router } from "express";
import express from "express";

// import Helper from "../utils/helper.js";


// import { checkPermission } from "../middleware/Permission.js";
import { CreateIssueTracker, deleteIssueById, getIssues, getIssuesById, updateIssueById } from "../controllers/IssueTracker.js";
// const helper = new Helper();
const router = express.Router();


//Routes
router.get("/issues", getIssues);
router.patch("/issues/:id", updateIssueById);
router.get("/issues/:id", getIssuesById);
router.post("/issues", CreateIssueTracker);
router.delete("/issues/:id", deleteIssueById);





export default router;
