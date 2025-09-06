import express from "express"
import { deleteBlogs, getBlogs, postBlogs } from "../controllers/controller.js";

const router = express.Router();


router.get('/',getBlogs)
router.post('/',postBlogs)
router.delete('/:bid',deleteBlogs)

export default router