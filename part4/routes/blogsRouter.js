import express from "express"
import { deleteBlogs, getBlogs, postBlogs, updateBlogs } from "../controllers/controller.js";

const router = express.Router();


router.get('/',getBlogs)
router.post('/',postBlogs)
router.delete('/:bid',deleteBlogs)
router.put('/:bid',updateBlogs)


export default router