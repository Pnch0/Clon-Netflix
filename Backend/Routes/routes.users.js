import express from 'express';

import { CreateUser, UpdateUser } from '../Controllers/users.controllers.js';

const router = express.Router();

router.post('/', CreateUser);
router.put('/:id', UpdateUser);



export default router;