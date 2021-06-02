import {Router} from 'express';
import {PermslistController} from './../controllers/lista_permissions.controller';
const router = Router();

const dc = new PermslistController()
router.get('/permlist', dc.getlistPerms)
export default router;