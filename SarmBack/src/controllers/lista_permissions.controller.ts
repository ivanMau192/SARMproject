import {request, Request, Response} from 'express';
import { getRepository } from "typeorm";
import { Permissions } from '../entity/Permissions';

export class PermslistController {
    
    getlistPerms = async (req: Request, res: Response): Promise<Response> => {
        let out = {status:false, data:[]}
        try{
                const listperm = await getRepository(Permissions)
                .createQueryBuilder("permissions")
                .getRawMany();
                console.log("lista de perfiles", listperm )
                out = {status:true, data:listperm}
                return res.send(out);                
            }
        catch(err) {
                console.log(err);
                return res.send(out);       
            }
    }


}