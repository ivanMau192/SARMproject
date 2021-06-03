import {Router} from 'express';
import {UserslistController} from './../controllers/lista_users.controller';
const router = Router();

const dc = new UserslistController()
router.post('/userslist', dc.getlistUsers)
export default router;