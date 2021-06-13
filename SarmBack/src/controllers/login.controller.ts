import {request, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Contracts } from '../entity/Contracts';
import { ProfilesPermissions } from '../entity/ProfilesPermissions';
import { Users } from '../entity/Users';


export class LoginController {
    logOut  = async (req: Request, res: Response): Promise<Response> => {
        req.session.destroy();
        let out = {status:true}
        return res.send(out)
    }
 
    isLogged = async (req: Request, res: Response): Promise<Response> => {

        
        let out = {status:true}
        if(req.session.user){
            return res.send(out)
        }else{
            out.status = false
            return res.send(out)
        }
        

    }

    getLogin = async (req: Request, res: Response): Promise<Response> => {
        console.log("login data")
        console.log(req.body)
        let user = req.body.user;
        let password = req.body.password;
        let out = {status:false,data:{}}
        
        let resp = await getRepository(Users)
                        .createQueryBuilder('u')
                        .innerJoinAndSelect('profiles_users','pu','pu.user_id = u.user_id')
                        .innerJoinAndSelect('profiles','p2','p2.prof_id = pu.prof_id')
                        .where(`u.user_name = '${user}' AND u.user_password = '${password}'`)
                        .select(['u.*','p2.*'])
                        .getRawMany();
        
        let permissions = []
        if(resp.length > 0){
            let profilesId = resp.map(v => {return v.prof_id})
            permissions = await getRepository(ProfilesPermissions)
                                    .createQueryBuilder('pf')
                                    .innerJoinAndSelect('permissions','p','pf.perm_id = p.perm_id')
                                    .select(['p.*'])
                                    .where(`pf.prof_id IN (${profilesId.toString()})`)
                                    .getRawMany();
            let contract = await getRepository(Contracts)
                            .createQueryBuilder('c')
                            .innerJoinAndSelect('user_contracts','uc','uc.cont_id = c.cont_id')
                            .where(`uc.user_id = ${resp[0].user_id}`)
                            .select(['c.*'])
                            .getRawMany()
            contract = contract[0]
            resp[0].contract = contract
            console.log(resp)
            req.session.user = resp[0];
            permissions = permissions.map(permission =>{return permission.perm_tag});
            req.session.permissions = permissions;
            out.data['user']={user:resp[0].user_name,user_username:resp[0].user_username}
            out.data["permissions"] = permissions;
            out.data["contract"] = contract;
            out.status = true;
        }
        
        return res.send(out);
    }
}