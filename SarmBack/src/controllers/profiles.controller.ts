import {request, Request, Response} from 'express';
import { getRepository } from "typeorm";
import { Profiles } from '../entity/Profiles';
import { ProfilesPermissions } from '../entity/ProfilesPermissions';

export class ProfilesController {
    
    getProfiles = async (req: Request, res: Response): Promise<Response> => {
        let profInsert = new Profiles()
        let profpermInsert = new ProfilesPermissions()
        if (!req.body.prof_id){
            console.log("Crear usuario")
            console.log(req.body)
            profInsert.profName=req.body.prof_name
            profInsert.profActive=req.body.prof_act
            try{
                await getRepository(Profiles).insert(profInsert)
                console.log(profInsert.profId)
                profpermInsert.prof =  profInsert
                console.log("En entidad profperm esta la id de prof: ",profpermInsert.prof.profId)
                 
                for (let i in req.body.perms) {
                    try{
                        profpermInsert.perm = req.body.perms[i];
                        console.log("lo que se insertaria en prof perm: ",profpermInsert.perm)
                        await getRepository(ProfilesPermissions).insert(profpermInsert)
                        console.log("Insertado")
                    }
                    catch(err){console.log(err)} 
                }
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