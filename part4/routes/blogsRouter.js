import express from "express"
import { deleteBlogs, getBlogs, postBlogs, updateBlogs } from "../controllers/controller.js";
import { userExtractor } from "../utils/middleware.js";

const router = express.Router();


router.get('/',getBlogs)
router.post('/',postBlogs,userExtractor)
router.delete('/:bid',deleteBlogs)
router.put('/:bid',updateBlogs)


export default router