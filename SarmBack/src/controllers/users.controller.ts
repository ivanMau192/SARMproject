import {request, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../entity/Users';
import { ProfilesUsers } from '../entity/ProfilesUsers';


export class UsersController {
    getUsers = async (req: Request, res: Response): Promise<Response> => {
        let user = new Users()
        let userprof = new ProfilesUsers()
        if (!req.body.user_id){
            console.log("Crear usuario")
            console.log(req.body)
            user.userName=req.body.user_name
            user.userPassword=req.body.user_pwd
            user.userUsername=req.body.user_username
            user.timeCreated = new Date()
            try{
                await getRepository(Users).insert(user)
                console.log(user.userId)
                userprof.user =  user
                console.log("En entidad user profile esta la id de user: ",userprof.user.userId)
                 
                try{
                    userprof.prof = req.body.prof_id;
                    console.log("lo que se insertaria en user profile: ",userprof.prof)
                    await getRepository(ProfilesUsers).insert(userprof)
                    console.log("Insertado")
                }
                catch(err){console.log(err)} 
                
            }
            catch(err) {
                console.log(err);
            }
        }
        else{
            console.log("Modificar usuario")
            console.log(req.body)
            user.userId=req.body.user_id
            user.userName=req.body.user_name
            user.userPassword=req.body.user_pwd
            user.userUsername=req.body.user_username
            userprof.prof=req.body.prof_id
            try{
                await getRepository(Users).createQueryBuilder("users").
                update(user).set({ userName: user.userName, userPassword: user.userPassword, userUsername: user.userUsername })
                .where('users.user_id = :Id', { Id:req.body.user_id }).execute(); 
                console.log("id a modificar: ", user.userId)
                userprof.user =  user
                console.log("En entidad user profile esta la id de user: ",userprof.user.userId)
                console.log("Actualizando prof id en entidad user profile: ")
                await getRepository(ProfilesUsers).createQueryBuilder("profusers").
                update(userprof).set({ prof: userprof.prof })
                .where('profiles_users.user_id = :Id', { Id:userprof.user.userId }).execute(); 
                
            }
            catch(err) {
                console.log(err);
            }
        }
        let out = {status:"Ok si fue satisfactorio, Error si ocurrio un error", data:""}
        return res.send(out);
        
    }
}