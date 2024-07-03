import express from 'express';
import { register, login, update, logout } from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout)
router.patch('/update', update);

export default router;

