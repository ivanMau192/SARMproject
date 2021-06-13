import {Router} from 'express';
import {UsersController} from './../controllers/users.controller';
const router = Router();

const dc = new UsersController()
router.post('/addUser', dc.addUsers)
router.get('/getAllUsers', dc.getAllUsers)

export default router;