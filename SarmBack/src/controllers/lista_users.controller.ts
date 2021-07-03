import {request, Request, Response} from 'express';
import { getRepository } from "typeorm";
import { Users } from '../entity/Users';


/** Controlador de usuarios
 * @module controllers/UserslistController
 */

export class UserslistController {

    /**
    * Funcion que obtiene lista de permisos
    * @function getlistUsers
    * @returns {Object} Objeto con lista de usuarios y estado de peticion
    *
    */

    getlistUsers = async (req: Request, res: Response): Promise<Response> => {
        try{
                const listuser = await getRepository(Users)
                .createQueryBuilder("users")
                .getRawMany();
                console.log("lista de perfiles", listuser )
                let out = {status:true, listuser}
                return res.send(out);                
            }
        catch(err) {
                console.log(err);
            }
    }


}