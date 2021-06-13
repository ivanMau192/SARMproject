import {request, Request, Response} from 'express';
import { getRepository } from "typeorm";
import { Profiles } from '../entity/Profiles';
import { ProfilesPermissions } from '../entity/ProfilesPermissions';

export class ProfilesController {

    
    
    getProfiles = async (req: Request, res: Response): Promise<Response> => {
        let prof = new Profiles()
        let profperm = new ProfilesPermissions()
        if (!req.body.prof_id){
            console.log("Crear usuario")
            console.log(req.body)
            prof.profName=req.body.prof_name
            prof.profActive=req.body.prof_act
            try{
                await getRepository(Profiles).insert(prof)
                console.log(prof.profId)
                profperm.prof =  prof
                console.log("En entidad profperm esta la id de prof: ",profperm.prof.profId)
                 
                for (let i in req.body.perms) {
                    try{
                        profperm.perm = req.body.perms[i];
                        console.log("lo que se insertaria en prof perm: ",profperm.perm)
                        await getRepository(ProfilesPermissions).insert(profperm)
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
            prof.profId=req.body.prof_id
            prof.profName=req.body.prof_name
            prof.profActive=req.body.prof_act
            try{
                await getRepository(Profiles).createQueryBuilder("profiles").
                update(prof).set({ profName: prof.profName, profActive: prof.profActive })
                .where('profiles.prof_id = :Id', { Id:req.body.prof_id }).execute(); 
                console.log("id a modificar: ", prof.profId)
                profperm.prof =  prof
                console.log("En entidad profperm esta la id de prof: ",profperm.prof.profId)
                console.log("eliminando datos de permisos antiguos: ")
                await getRepository(ProfilesPermissions).createQueryBuilder("Profperm")
                .delete().from(ProfilesPermissions).where("profiles_permissions.prof_id = :Id", { Id: profperm.prof.profId }).execute();
                for (let i in req.body.perms) {
                    try{
                        profperm.perm = req.body.perms[i];
                        console.log("Nuevo dato a insertar en prof perm: ",profperm.perm)
                        await getRepository(ProfilesPermissions).insert(profperm)
                        console.log("Insertado")
                    }
                    catch(err){console.log(err)} 
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        let out = {status:"Ok si fue satisfactorio, Error si ocurrio un error", data:""}
        return res.send(out);
        
    }


}