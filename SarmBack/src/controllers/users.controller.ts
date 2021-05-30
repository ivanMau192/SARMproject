import {request, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Contracts } from '../entity/Contracts';


export class UsersController {
    getUsers = async (req: Request, res: Response): Promise<Response> => {
        console.log("Obteniendo desde usuarios")
        console.log(req.body)
        console.log(req.body.param1)
        let out = {status:"Ok si fue satisfactorio, Error si ocurrio un error", data:""}
        return res.send(out);
    }
}