import express from "express"
import { getBlogs, postBlogs } from "../controllers/controller.js";

const router = express.Router();


router.get('/',getBlogs)
router.post('/',postBlogs)

export default router