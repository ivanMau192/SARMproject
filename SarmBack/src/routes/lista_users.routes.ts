import {Router} from 'express';
import {UserslistController} from './../controllers/lista_users.controller';


/** rutas para controlador de usuarios
 * @module routes/UserslistController
 */


const router = Router();

const dc = new UserslistController()
/**
 * Ruta para obtener lista de usuarios
 * @name post/userslist
 * @function
 * @inner
 * @returns {Object} Objeto con lista de usuarios actualizada y estado de peticion
 */
router.post('/userslist', dc.getlistUsers)
export default router;