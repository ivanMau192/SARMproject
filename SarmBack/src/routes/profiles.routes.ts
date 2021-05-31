import {Router} from 'express';
import {ProfilesController} from './../controllers/profiles.controller';
const router = Router();

const dc = new ProfilesController()
router.get('/profiles', dc.getProfiles)
router.get('/funcion', dc.funcionNueva)
export default router;