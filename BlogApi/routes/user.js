import express from "express";
import {getUser, createUser, getSingleUser, deleteUser, updateUser, loginUser } from '../controllers/user.js'


const router = express.Router();

router.get('/', getUser);
router.get('/:id', getSingleUser);
router.post('/', createUser);
router.put('/:id', updateUser)
router.delete('/:id', deleteUser);
router.post('/login', loginUser);


export default router;