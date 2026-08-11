import express from 'express';

import { CreateUser } from '../Controllers/users.controllers.js';

const router = express.Router();

router.post('/', CreateUser);



export default router;