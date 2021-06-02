import {request, Request, Response} from 'express';
import { getRepository } from "typeorm";
import { Profiles } from '../entity/Profiles';

export class ProfilesController {
    
    getProfiles = async (req: Request, res: Response): Promise<Response> => {
        let profInsert = new Profiles()
        if (!req.body.prof_id){
            console.log("Crear usuario")
            console.log(req.body)
            profInsert.profName=req.body.prof_name
            profInsert.profActive=req.body.prof_act
            try{
                await getRepository(Profiles).insert(profInsert)
            }
            catch(err) {
                console.log(err);
            }
        }
        else{
            console.log("Modificar usuario")
            console.log(req.body)
        }
        let out = {status:"Ok si fue satisfactorio, Error si ocurrio un error", data:""}
        return res.send(out);
        
    }


}