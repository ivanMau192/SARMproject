import {request, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../entity/Users';
import { ProfilesUsers } from '../entity/ProfilesUsers';
import { ServicesTypes } from '../entity/ServicesTypes';
import { Contracts } from '../entity/Contracts';


export class ServicesController {
    addService = async (req: Request, res: Response): Promise<Response> => {
        
        console.log(req.body);

        let service = new ServicesTypes;

        service.servName=req.body.serv_name;
        service.contId = req.body.cont_id;
        service.servPrice = req.body.serv_price

        if(req.body.serv_type_id){
            let id = parseInt(req.body.serv_type_id)
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

        return res.send("OK");
        
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