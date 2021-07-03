import {Router} from 'express';
import {PermslistController} from './../controllers/lista_permissions.controller';


/** rutas para controlador de usuarios 
 * @module routes/PermslistController
 */


const router = Router();

const dc = new PermslistController()

/**
 * Ruta para obtener lista de permisos
 * @name post/permlist
 * @function
 * @inner
 * @returns {Object} Objeto con lista de permisos actualizada y estado de peticion
 */

router.post('/permlist', dc.getlistPerms)
export default router;