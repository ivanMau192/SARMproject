import {request, Request, Response} from 'express';


export class ProfilesController {
    
    getProfiles = async (req: Request, res: Response): Promise<Response> => {
        return res.send(req.session);
    }

    funcionNueva = async (req: Request, res: Response): Promise<Response> => {
        console.log("EJECUTANDO FUNCION")
        return res.send("asdasdasdasdas");
    }


}