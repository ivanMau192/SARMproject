import {Router} from 'express';
import {ProfilesController} from './../controllers/profiles.controller';
const router = Router();

const dc = new ProfilesController()
router.get('/profiles', dc.getProfiles)

export default router;