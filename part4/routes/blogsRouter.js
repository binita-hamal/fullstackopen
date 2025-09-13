import express from "express"
import { deleteBlogs, getBlogs, postBlogs, updateBlogs } from "../controllers/controller.js";
import { tokenExtractor, userExtractor } from "../utils/middleware.js";

const router = express.Router();


router.get('/',getBlogs)
router.post('/',tokenExtractor,userExtractor,postBlogs)
router.delete('/:bid',tokenExtractor,userExtractor,deleteBlogs)
router.put('/:bid',updateBlogs)


export default router