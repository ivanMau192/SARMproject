import {Router} from 'express';
import {LoginController} from './../controllers/login.controller';
const router = Router();


/** rutas para controlador de login y autenticacion
 * @module routes/LoginController
 */



const dc = new LoginController()


/**
 * Ruta para realizar login
 * @name post/login
 * @function
 * @inner
 * @param {string} user Usuario a autenticar
 * @param {string} password Password de usuario
 * @returns {Object} Objeto con Estado de peticion
 */
router.post('/login', dc.getLogin)


/**
 * Ruta para obtener estadod de login
 * @name get/isLogged
 * @function
 * @inner
 * @returns {Object} Objeto con Estado de login
 */
router.get('/isLogged', dc.isLogged)

/**
 * Ruta para hacer logout
 * @name get/logout
 * @function
 * @inner
 * @returns {Object} Objeto con estado de logout
 */
router.get('/logout', dc.logOut)
export default router;