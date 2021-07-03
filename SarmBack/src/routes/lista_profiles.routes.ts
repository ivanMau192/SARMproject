import {Router} from 'express';
import {ProfileslistController} from './../controllers/lista_profiles.controller';

/** rutas para controlador de perfiles
 * @module routes/ProfileslistController
 */

const router = Router();

const dc = new ProfileslistController()

/**
 * Ruta para obtener lista de perfiles
 * @name post/profileslist
 * @function
 * @inner
 * @returns {Object} Objeto con lista de perfiles actualizada y estado de peticion
 */

router.post('/profileslist', dc.getlistProfiles)

/**
 * Ruta para obtener lista de permisos
 * @name post/permissionsList
 * @function
 * @inner
 * @returns {Object} Objeto con lista de permisos actualizada y estado de peticion
 */
router.post('/permissionsList', dc.getPermissionsList)
export default router;