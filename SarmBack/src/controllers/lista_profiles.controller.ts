import {request, Request, Response} from 'express';
import { getRepository } from "typeorm";
import { Permissions } from '../entity/Permissions';
import { Profiles } from '../entity/Profiles';
import { ProfilesPermissions } from '../entity/ProfilesPermissions';

export class ProfileslistController {
    
    getlistProfiles = async (req: Request, res: Response): Promise<Response> => {
        let out = {status:false, data:[]}
        try{
                const listprof = await getRepository(Profiles)
                .createQueryBuilder("p")
                .getRawMany();
                let profid = listprof.map(v=>{return v.p_prof_id})
                let permList = await getRepository(ProfilesPermissions)
                                    .createQueryBuilder('pp')
                                    .innerJoinAndSelect('permissions','p','p.perm_id = pp.perm_id')
                                    .select(['p.*','pp.prof_id'])
                                    .distinct()
                                    .getRawMany()
                listprof.forEach((v,k)=>{
                    let perm = permList.filter(v2=>{return v.p_prof_id == v2.prof_id})
                    perm = perm.map(v=>{return v.perm_id})
                    listprof[k].permissions = perm
                })
                console.log(permList)
                console.log("lista de perfiles", listprof )
                out = {status:true, data:listprof}
                return res.send(out);                
            }
        catch(err) {
                console.log(err);
            }
        
    }

    getPermissionsList = async (req: Request, res: Response): Promise<Response> => {
        let out = {status:false, data:[]}
        const listprof = await getRepository(Permissions)
                .createQueryBuilder("p")
                .where(`p.perm_active = 'ACTIVO'`)
                .getRawMany();
        out = {status:true, data:listprof}
        return res.send(out);     
    }


}