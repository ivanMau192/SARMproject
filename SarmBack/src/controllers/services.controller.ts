import {request, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../entity/Users';
import { ProfilesUsers } from '../entity/ProfilesUsers';
import { ServicesTypes } from '../entity/ServicesTypes';
import { Contracts } from '../entity/Contracts';


export class ServicesController {
    addService = async (req: Request, res: Response): Promise<Response> => {
        
        console.log(req.body);

        for(let s of req.body.data){

            let service = new ServicesTypes;
            service.servName=s.servName;
            service.contId = s.contId;
            service.servPrice = s.servPrice

            if(s.servTypeId){
                let id = parseInt(s.servTypeId)
                service.servTypeId = id
                await getRepository(ServicesTypes).save(service)
            }
            else{
                try{
                    let resp = await getRepository(ServicesTypes).insert(service)
                }catch(e){
                    return res.send("ERROR")
                }
                

            }
        }
        return res.send({status:"OK"});
        
    }

   

    getAllServices = async (req: Request, res: Response): Promise<Response> => {
        let resp = await getRepository(ServicesTypes).find()
        return res.send(resp);
    }


    getAllContracts = async (req: Request, res: Response): Promise<Response> => {
        let resp = await getRepository(Contracts).find()
        return res.send(resp);
    }
    
}

function AddServicesModalComponent(AddServicesModalComponent: any, arg1: { data: { profiles: any; }; }) {
    throw new Error('Function not implemented.');
}
