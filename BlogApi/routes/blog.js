import express from "express";
import {getBlog, createBlog, getSingleBlog, deleteBlog, updateBlog } from '../controllers/blog.js'
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get('/', getBlog);
router.get('/:id', getSingleBlog);
router.post('/', auth, createBlog);
router.put('/:id', auth,  updateBlog)
router.delete('/:id',auth,  deleteBlog);


export default router;