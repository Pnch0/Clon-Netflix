import express from 'express';

import { CreateUser, UpdateUser, GetUser } from '../Controllers/users.controllers.js';

const router = express.Router();

router.post('/', CreateUser);
router.get('/', GetUser);
router.put('/:id', UpdateUser);




export default router;