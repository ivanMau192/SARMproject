import {Router} from 'express';
import { ServicesController } from '../controllers/services.controller';

const router = Router();

const dc = new ServicesController()
router.post('/addService', dc.addService)
router.post('/getAllServices', dc.getAllServices)
router.post('/getAllContracts', dc.getAllContracts)
export default router;