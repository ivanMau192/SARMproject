import {Router} from 'express';
import {LoginController} from './../controllers/login.controller';
const router = Router();

const dc = new LoginController()
router.post('/login', dc.getLogin)
router.get('/isLogged', dc.isLogged)
router.get('/logout', dc.logOut)
export default router;