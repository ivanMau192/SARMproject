import {Router} from 'express';
import { ServicesController } from '../controllers/services.controller';

const router = Router();

const dc = new ServicesController()
router.post('/addService', dc.addService)
router.post('/getAllServices', dc.getAllServices)
router.post('/getAllContracts', dc.getAllContracts)
router.post('/services/addDataServices',dc.addDataServices)
router.post('/getServicesData',dc.getServicesData)
router.post('/getServicesFiltered',dc.getServicesFiltered)
router.post('/getAllModules',dc.getAllModules)
export default router;