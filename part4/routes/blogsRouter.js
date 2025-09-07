import express from "express"
import { deleteBlogs, getBlogs, postBlogs, updateBlogs } from "../controllers/controller.js";
import { tokenExtractor, userExtractor } from "../utils/middleware.js";

const router = express.Router();


router.get('/',getBlogs)
router.post('/',postBlogs,userExtractor,tokenExtractor)
router.delete('/:bid',deleteBlogs,userExtractor,tokenExtractor)
router.put('/:bid',updateBlogs)


export default router