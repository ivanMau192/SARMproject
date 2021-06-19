import {request, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../entity/Users';
import { ProfilesUsers } from '../entity/ProfilesUsers';
import { ServicesTypes } from '../entity/ServicesTypes';
import { Contracts } from '../entity/Contracts';
import { Services } from '../entity/Services';
import { ServicesData } from '../entity/ServicesData';


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


    addDataServices= async (req: Request, res: Response): Promise<Response> =>{


        let addingServices = req.body.service
        let addingDataServices = req.body.data
        let id
        for(let service of addingServices){
            let insertService = new Services
            console.log(service)
            insertService.servType = service.servTypeId
            insertService.time = service.hour;
            insertService.sector = service.sector;
            insertService.status = service.status;
            insertService.quantity = service.quantity;
            insertService.equipment = service.equipment;
            if(service.servId){
                console.log("ENTER")
                id = parseInt(service.servId)
                insertService.servId = id
                await getRepository(Services).save(insertService)
            }else{
                try{
                    let resp = await getRepository(Services).insert(insertService)
                    id = resp.identifiers[0].servId
                    console.log(resp)
                }catch(e){
                    console.log(e)
                    return res.send("ERROR")
                }
            }

            for(let data of addingDataServices){
                let insertData = new ServicesData
                insertData.location = data.location
                insertData.maintanceStatus = data.status
                insertData.serv = id
                insertData.cause = data.cause
                insertData.status = data.cont_status
                insertData.observation = data.description
                insertData.time = data.hour

                if(data.servDataId){
                    id = parseInt(data.servDataId)
                    insertData.servDataId = id
                    await getRepository(ServicesData).save(insertData)
                }else{
                    try{
                        let resp = await getRepository(ServicesData).insert(insertData)
                    }catch(e){
                        console.log(e)
                        return res.send("ERROR")
                    }
                }

            }

            console.log(id)
        }

        return res.send({status:"OK",id:id})

    }


    getServicesData= async (req: Request, res: Response): Promise<Response> =>{

        let id = req.body.servId
        
        let respServ = await getRepository(Services).createQueryBuilder('s')
                    .where(`s.serv_id = ${id}`)
                    .select(['s.*'])
                    .getRawMany()

        let respData = await getRepository(ServicesData).createQueryBuilder('sd')
                        .where(`sd.serv_id = ${id}`)
                        .select(['sd.*'])
                        .getRawMany()
        respServ = respServ.map(v=>{
            let out = {
                service_id:v.serv_id,
                servTypeId:v.serv_type_id,
                hour:v.time,
                quantity:v.quantity,
                equipment:v.equipment,
                status:v.status,
                sector:v.sector,
                date:v.timestamp
            }
            return out
        })

        

        respData = respData.map(v=>{
            let out = {
                servTypeId:respServ[0].servTypeId,
                service_id:v.serv_data_id,
                location:v.location,
                hour:v.time,
                status:v.status,
                cause:v.cause,
                description:v.observation,
                cont_status:v.maintance_status
            }
            return out
        })

        return res.send({data:respData,serv:respServ})



    }


    getServicesFiltered = async (req: Request, res: Response): Promise<Response> =>{

        let fecha = req.body.fecha;
        let contId = req.body.contId;
        let out=[]

        let resp = await getRepository(Services).createQueryBuilder('s')
                            .innerJoinAndSelect('services_types','st','s.serv_type_id=st.serv_type_id')
                            .where(`s.timestamp::date = '${fecha}'`)
                            .select(['s.*','st.cont_id'])
                            .getRawMany()
        if(contId){
            resp = resp.filter(v =>{return v.cont_id==contId})
        }
        
        for(let v of resp){
            let dataResp = await getRepository(ServicesData).createQueryBuilder('sd')
                            .where(`sd.serv_id = ${v.serv_id}`)
                            .select(['s.*'])
                            .getCount()
            let out2={status:v.status,cantidad:dataResp,id:v.serv_id}
            out.push(out2)

        }

        return res.send(out)

    }

    
}


