import {request, Request, Response} from 'express';
import { getRepository } from "typeorm";
import { Profiles } from '../entity/Profiles';

export class ProfileslistController {
    
    getlistProfiles = async (req: Request, res: Response): Promise<Response> => {
        let out = {status:false, data:[]}
        try{
                const listprof = await getRepository(Profiles)
                .createQueryBuilder("p")
                .where(`p.prof_active = 'ACTIVO'`)
                .getRawMany();
                console.log("lista de perfiles", listprof )
                out = {status:true, data:listprof}
                return res.send(out);                
            }
        catch(err) {
                console.log(err);
            }
        
    }


}