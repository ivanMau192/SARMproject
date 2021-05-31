import {Router} from 'express';
import {UsersController} from './../controllers/users.controller';
const router = Router();

const dc = new UsersController()
router.post('/users', dc.getUsers)

export default router;