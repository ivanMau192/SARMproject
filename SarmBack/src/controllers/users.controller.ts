import {request, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Contracts } from '../entity/Contracts';


export class UsersController {
    getUsers = async (req: Request, res: Response): Promise<Response> => {
        console.log("Obteniendo desde usuarios")
        if (!req.body.user_id){
            console.log("Crear usuario")
            console.log(req.body)
        }
        else{
            console.log("Modificar usuario")
            console.log(req.body)
        }
        let out = {status:"Ok si fue satisfactorio, Error si ocurrio un error", data:""}
        return res.send(out);
    }
}