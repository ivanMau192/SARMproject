import {Router} from 'express';
import {ProfilesController} from './../controllers/profiles.controller';
const router = Router();

const dc = new ProfilesController()
router.post('/profiles/modify', dc.getProfiles)
export default router;