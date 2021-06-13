import {request, Request, Response} from 'express';
import { getRepository } from "typeorm";
import { Profiles } from '../entity/Profiles';
import { ProfilesPermissions } from '../entity/ProfilesPermissions';

export class ProfilesController {

    
    
    getProfiles = async (req: Request, res: Response): Promise<Response> => {
        console.log(req.body.data)
        
        for(let profile of req.body.data){
            let prof = new Profiles()
            let profperm = new ProfilesPermissions()
            if (!profile.p_prof_id){
                console.log("Crear usuario")
                
                prof.profName=profile.p_prof_name
                prof.profActive=profile.p_prof_active
                try{
                    await getRepository(Profiles).insert(prof)
                    console.log(prof.profId)
                    profperm.prof = prof
                    console.log("En entidad profperm esta la id de prof: ",profperm.prof.profId)
                    console.log(profile)
                    for (let i in profile.permissions) {
                        try{
                            profperm.perm = profile.permissions[i];
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
            
                prof.profId=profile.p_prof_id
                prof.profName=profile.p_prof_name
                prof.profActive=profile.p_prof_active
                try{
                    console.log(prof)
                    await getRepository(Profiles).createQueryBuilder("profiles").
                    update(prof).set({ profName: prof.profName, profActive: prof.profActive })
                    .where('profiles.prof_id = :Id', { Id:prof.profId }).execute(); 
                    console.log("id a modificar: ", prof.profId)
                    profperm.prof =  prof
                    console.log("En entidad profperm esta la id de prof: ",profperm.prof.profId)
                    console.log("eliminando datos de permisos antiguos: ")
                    await getRepository(ProfilesPermissions).createQueryBuilder("Profperm")
                    .delete().from(ProfilesPermissions).where("profiles_permissions.prof_id = :Id", { Id: profperm.prof.profId }).execute();
                    for (let i in profile.permissions) {
                        try{
                            profperm.perm = profile.permissions[i];
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
        }
            
        let out = {status:"Ok si fue satisfactorio, Error si ocurrio un error", data:""}
        return res.send(out);
        
    }


}