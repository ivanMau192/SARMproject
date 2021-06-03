import {request, Request, Response} from 'express';
import { getRepository } from "typeorm";
import { Profiles } from '../entity/Profiles';

export class ProfileslistController {
    
    getlistProfiles = async (req: Request, res: Response): Promise<Response> => {
        try{
                const listprof = await getRepository(Profiles)
                .createQueryBuilder("profiles")
                .getRawMany();
                console.log("lista de perfiles", listprof )
                let out = {status:"Ok si fue satisfactorio, Error si ocurrio un error", listprof}
                return res.send(out);                
            }
        catch(err) {
                console.log(err);
            }
        
    }


}