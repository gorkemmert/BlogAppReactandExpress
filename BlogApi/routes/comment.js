import express from "express";
import {getComment, createComment, getSingleComment, deleteComment, updateComment, getCommentbyBlogId } from '../controllers/comment.js'
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get('/', getComment);
router.get('/byBlogId/:id', getCommentbyBlogId);
router.get('/:id', getSingleComment);
router.post('/', createComment);
router.put('/:id', updateComment)
router.delete('/:id', deleteComment);


export default router;