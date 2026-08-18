import express from 'express';

import { CreateUser, UpdateUser, GetUser, LoginUser } from '../Controllers/users.controllers.js';

const router = express.Router();

router.post('/', CreateUser);
router.get('/', GetUser);
router.put('/:id', UpdateUser);
router.post('/login', LoginUser);




export default router;