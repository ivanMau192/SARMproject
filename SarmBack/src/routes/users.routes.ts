import {Router} from 'express';
import {UsersController} from './../controllers/users.controller';

/** rutas para controlador de usuarios extendido
 * @module routes/UsersController
 */


const router = Router();

const dc = new UsersController()

/**
 * Ruta para agregar y/o modificar usuarios
 * @name post/addUser
 * @function
 * @inner
 * @param {id} userId id de usuario a modificar (Vacio si se crea uno nuevo)
 * @param {string} userName nombre de usuario
 * @param {string} password contraseña de usuario
 * @param {string} userUsername nombre de inicio de sesion de usuario
 * @param {string} userActive Estado de usuario
 * @returns {Object} Objeto con detalle de servicio y estado de peticion
 */
router.post('/addUser', dc.addUsers)


/**
 * Ruta para obtener usuarios
 * @name get/getAllUsers
 * @function
 * @inner
 * @returns {Object} Objeto con detalle de usuarios y estado de peticion
 */
router.get('/getAllUsers', dc.getAllUsers)

export default router;