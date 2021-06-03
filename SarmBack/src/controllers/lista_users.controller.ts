import {request, Request, Response} from 'express';
import { getRepository } from "typeorm";
import { Users } from '../entity/Users';

export class UserslistController {
    
    getlistUsers = async (req: Request, res: Response): Promise<Response> => {
        try{
                const listuser = await getRepository(Users)
                .createQueryBuilder("users")
                .getRawMany();
                console.log("lista de perfiles", listuser )
                let out = {status:"Ok si fue satisfactorio, Error si ocurrio un error", listuser}
                return res.send(out);                
            }
        catch(err) {
                console.log(err);
            }
    }


}