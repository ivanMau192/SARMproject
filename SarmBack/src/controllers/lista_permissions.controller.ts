import {request, Request, Response} from 'express';
import { getRepository } from "typeorm";
import { Permissions } from '../entity/Permissions';

export class PermslistController {
    
    getlistPerms = async (req: Request, res: Response): Promise<Response> => {
        try{
                const listperm = await getRepository(Permissions)
                .createQueryBuilder("permissions")
                .getRawMany();
                console.log("lista de perfiles", listperm )
                let out = {status:"Ok si fue satisfactorio, Error si ocurrio un error", listperm}
                return res.send(out);                
            }
        catch(err) {
                console.log(err);
            }
    }


}