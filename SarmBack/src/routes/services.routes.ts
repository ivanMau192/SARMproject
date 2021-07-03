import {Router} from 'express';
import { ServicesController } from '../controllers/services.controller';


/** rutas para controlador de servicios
 * @module routes/ServicesController
 */

const router = Router();

const dc = new ServicesController()
/**
 * Ruta para Agregar Servicios
 * @name post/addService
 * @function
 * @inner
 * @param {string} servName Nombre del servicio
 * @param {string} contId Id de contrato del servicio
 * @param {string} servPrice Precio del servicio 
 * @param {string} moduId id del modulo correspondiente al servicio
 * @param {string} servTypeId id de servicio a modificar (Vacio se se creara uno nuevo)
 * @returns {Object} Objeto con estado de peticion
 */
router.post('/addService', dc.addService)


/**
 * Ruta para obtener servicios
 * @name post/getAllServices
 * @function
 * @inner
 * @returns {Object} Objeto con estado de peticion
 */
router.post('/getAllServices', dc.getAllServices)

/**
 * Ruta para obtener contratos
 * @name post/getAllContracts
 * @function
 * @inner
 * @returns {Object} Objeto con lista de contratos y estado de peticion
 */
router.post('/getAllContracts', dc.getAllContracts)

/**
 * Ruta para agregar data de servicios
 * @name post/services/addDataServices
 * @function
 * @inner
 * @param {Object} service Objeto con servicio a realizar
 * @param {Object} data Objeto con detalle de servicio a realizar
 * @returns {Object} Objeto con Estado de peticion
 */
router.post('/services/addDataServices',dc.addDataServices)
/**
 * Ruta para obtener datos de servicio
 * @name post/getServicesData
 * @function
 * @inner
 * @param {id} servId id de servicio a consultar
 * @returns {Object} Objeto con detalle de servicio y estado de peticion
 */
router.post('/getServicesData',dc.getServicesData)


/**
 * Ruta para obtener datos de servicio segun fecha y contrato
 * @name post/getServicesFiltered
 * @function
 * @inner
 * @param {id} contId id de servicio a consultar
 * @param {Date} fecha fecha de servicio a consultar
 * @returns {Object} Objeto con detalle de servicio y estado de peticion
 */
router.post('/getServicesFiltered',dc.getServicesFiltered)

/**
 * Ruta para obtener modulos
 * @name post/getAllModules
 * @function
 * @inner
 * @returns {Object} Objeto con modulos y Estado de peticion
 */
router.post('/getAllModules',dc.getAllModules)
export default router;