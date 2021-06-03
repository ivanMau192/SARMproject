import {Router} from 'express';
import {PermslistController} from './../controllers/lista_permissions.controller';
const router = Router();

const dc = new PermslistController()
router.post('/permlist', dc.getlistPerms)
export default router;