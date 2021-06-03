import {Router} from 'express';
import {ProfileslistController} from './../controllers/lista_profiles.controller';
const router = Router();

const dc = new ProfileslistController()
router.post('/profileslist', dc.getlistProfiles)
export default router;