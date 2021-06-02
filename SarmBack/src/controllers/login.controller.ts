import {request, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Contracts } from '../entity/Contracts';


export class LoginController {
    getLogin = async (req: Request, res: Response): Promise<Response> => {
        console.log("login data")
        console.log(req.body)
        
        let out = {status:"Ok si fue satisfactorio, Error si ocurrio un error", data:"permissions", prof_name:"", prof_id:""}
        return res.send(out);
    }
}