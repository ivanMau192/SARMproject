import {request, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../entity/Users';
import { ProfilesUsers } from '../entity/ProfilesUsers';
import { ServicesTypes } from '../entity/ServicesTypes';
import { Contracts } from '../entity/Contracts';
import { Services } from '../entity/Services';
import { ServicesData } from '../entity/ServicesData';
import { Modules } from '../entity/Modules';

/** Controlador de servicios
 * @module controllers/ServicesController
 */

export class ServicesController {


    /**
    * Funcion que agrega y/o modifica servicio
    * @function addService
    * @param {string} servName Nombre del servicio
    * @param {string} contId Id de contrato del servicio
    * @param {string} servPrice Precio del servicio 
    * @param {string} moduId id del modulo correspondiente al servicio
    * @param {string} servTypeId id de servicio a modificar (Vacio se se creara uno nuevo)
    * @returns {Object} Objeto con Estado de peticion
    *
    */


    addService = async (req: Request, res: Response): Promise<Response> => {
        
        console.log(req.body);

        for(let s of req.body.data){

            let service = new ServicesTypes;
            service.servName=s.servName;
            service.contId = s.contId;
            service.servPrice = s.servPrice
            service.moduId = s.moduId;
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

   
    /**
    * Funcion que obtiene lista de servicios
    * @function getAllServices
    * @returns {Object} Objeto con servicios y Estado de peticion
    *
    */

    getAllServices = async (req: Request, res: Response): Promise<Response> => {
        let resp = await getRepository(ServicesTypes).find()
        let modules = await getRepository(Modules).find()
        console.log(resp)
        console.log(modules)

        resp = resp.map(v=>{
            let out = v
            let module = modules.filter(module=>{return module.moduId == v.moduId})
            out["moduTag"] = module[0].moduTag
            out["moduId"]= module[0].moduId
            return out
        })

        return res.send(resp);
    }


    /**
    * Funcion que obtiene lista de servicios
    * @function getAllModules
    * @returns {Object} Objeto con modulos y Estado de peticion
    *
    */

    getAllModules = async (req: Request, res: Response): Promise<Response> => {
        let modules = await getRepository(Modules).find()
        console.log(modules)
        return res.send(modules)
    }

    /**
    * Funcion que obtiene lista de contratos
    * @function getAllContracts
    * @returns {Object} Objeto con modulos y Estado de peticion
    *
    */

    getAllContracts = async (req: Request, res: Response): Promise<Response> => {
        let resp = await getRepository(Contracts).find()
        return res.send(resp);
    }


    /**
    * Funcion que Agrega datos de servicios
    * @function addDataServices
    * @param {Object} service Objeto con servicio a realizar
    * @param {Object} data Objeto con detalle de servicio a realizar
    * @returns {Object} Objeto con Estado de peticion
    *
    */

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
            if(service.service_id){
                console.log("ENTER")
                id = parseInt(service.service_id)
                insertService.servId = id
                console.log(insertService)
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
                insertData.maintanceStatus = data.cont_status
                insertData.serv = id
                insertData.cause = data.cause
                insertData.status = data.status
                insertData.observation = data.description
                insertData.time = data.hour

                if(service.service_id){
                    console.log("ENTER")
                    insertData.servDataId = parseInt(data.service_id)
                    console.log(insertData)
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


    /**
    * Funcion que obtiene datos de servicio
    * @function getServicesDatas
    * @param {id} servId id de servicio a consultar
    * @returns {Object} Objeto con detalle de servicio y estado de peticion
    *
    */

    getServicesData= async (req: Request, res: Response): Promise<Response> =>{

        let id = req.body.servId
        
        let respServ = await getRepository(Services).createQueryBuilder('s')
                    .where(`s.serv_id IN (${id.toString()})`)
                    .select(['s.*'])
                    .getRawMany()

        let respData = await getRepository(ServicesData).createQueryBuilder('sd')
                        .where(`sd.serv_id IN (${id.toString()})`)
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
                cont_status:v.maintance_status,
                serv_id:v.serv_id
            }
            return out
        })

        return res.send({data:respData,serv:respServ})



    }


    /**
    * Funcion que obtiene datos de servicio segun fecha y contrato
    * @function getServicesDatas
    * @param {id} contId id de servicio a consultar
    * @param {Date} fecha fecha de servicio a consultar
    * @returns {Object} Objeto con detalle de servicio y estado de peticion
    *
    */

    getServicesFiltered = async (req: Request, res: Response): Promise<Response> =>{

        let fecha = req.body.fecha;
        let contId = req.body.contId;
        let out=[]

        let resp = await getRepository(Services).createQueryBuilder('s')
                            .innerJoinAndSelect('services_types','st','s.serv_type_id=st.serv_type_id')
                            .innerJoinAndSelect('modules','md','st.modu_id = md.modu_id')
                            .where(`s.timestamp::date = '${fecha}'`)
                            .select(['s.*','st.cont_id','st.serv_name','md.modu_tag'])
                            .getRawMany()
        if(contId){
            resp = resp.filter(v =>{return v.cont_id==contId})
        }
        
        for(let v of resp){
            let dataResp = await getRepository(ServicesData).createQueryBuilder('sd')
                            .where(`sd.serv_id = ${v.serv_id}`)
                            .select(['s.*'])
                            .getCount()
            let out2={status:v.status,cantidad:dataResp,id:v.serv_id,name:v.serv_name,moduTag:v.modu_tag}
            out.push(out2)

        }

        return res.send(out)

    }

    
}


