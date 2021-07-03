import {Router} from 'express';
import {ProfilesController} from './../controllers/profiles.controller';

/** rutas para controlador de perfiles extendido
 * @module routes/ProfilesController
 */

const router = Router();

const dc = new ProfilesController()
/**
 * Ruta para obtener lista de usuarios
 * @name get/profiles/modify
 * @function
 * @inner
 * @param {string} user Usuario a autenticar
 * @param {string} password Password de usuario
 * @returns {Object} Objeto con Estado de peticion
 */
router.post('/profiles/modify', dc.getProfiles)
export default router;