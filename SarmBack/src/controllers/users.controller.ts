import {request, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../entity/Users';
import { ProfilesUsers } from '../entity/ProfilesUsers';


/** Controlador de usuarios extendido
 * @module controllers/UsersController
 */

export class UsersController {


    /**
    * Funcion que agrega y/o modifica usuario
    * @function getServicesDatas
    * @param {id} userId id de usuario a modificar (Vacio si se crea uno nuevo)
    * @param {string} userName nombre de usuario
    * @param {string} password contraseña de usuario
    * @param {string} userUsername nombre de inicio de sesion de usuario
    * @param {string} userActive Estado de usuario
    * @returns {Object} Objeto con detalle de servicio y estado de peticion
    *
    */
    
    addUsers = async (req: Request, res: Response): Promise<Response> => {
        
        console.log(req.body)
        for(let u of req.body.data){
            console.log(u)
            let user = new Users()
            let userprof = new ProfilesUsers()
            if (!u.userId){
                console.log("Crear usuario")
                
                user.userName=u.userName
                user.userPassword=u.password
                user.userUsername=u.userUsername
                user.timeCreated = new Date()
                user.userActive = u.userActive
                try{
                    await getRepository(Users).insert(user)
                    
                    console.log(user.userId)
                    userprof.user =  user
                    console.log("En entidad user profile esta la id de user: ",userprof.user.userId)
                    
                    try{
                        userprof.prof = u.prof_name;
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
                
                user.userId=u.userId;
                user.userName=u.userName
                user.userPassword=u.password
                user.userUsername=u.userUsername
                user.userActive = u.userActive
                userprof.prof=u.prof_name
                let update = {
                    userName: user.userName, userPassword: user.userPassword, userUsername: user.userUsername,userActive: user.userActive
                }
                if(!u.password){
                    delete update.userPassword
                }
                try{
                    
                    await getRepository(Users).createQueryBuilder("users").
                    update(user).set(update)
                    .where('users.user_id = :Id', { Id:user.userId }).execute(); 
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
        }

                
        let out = {status:"Ok si fue satisfactorio, Error si ocurrio un error", data:""}
        return res.send(out);
        
    }


    /**
    * Funcion que obtiene datos de usuarios
    * @function getAllUsers
    * @returns {Object} Objeto con detalle de usuarios y estado de peticion
    *
    */

    getAllUsers = async (req: Request, res: Response): Promise<Response> => {
        let out = {status:false,data:{}}
        
        if(req.session.user){
            
            let permissions = req.session.permissions
            
            if(permissions.includes('users-module')){
                let resp = await getRepository(Users).createQueryBuilder('u')
                                .innerJoinAndSelect('profiles_users','pu','pu.user_id = u.user_id')
                                .innerJoinAndSelect('profiles','p','pu.prof_id = p.prof_id')
                                .select(['u.*','p.*'])
                                .getRawMany();
                resp = resp.map(v =>{
                    let out = {
                        "userId": v.user_id,
                        "userName": v.user_name,
                        "userUsername": v.user_username,
                        "timeCreated": v.time_created,
                        "userIdCreated": v.user_id_created,
                        "userActive": v.user_active,
                        "prof_name":v.prof_id
                    }
                    return out;
                })
                console.log(resp)
                out.data = resp
            }
            
            return res.send(out)
        }else{
            
            out.status = false
            return res.send(out)
        }
    }
}