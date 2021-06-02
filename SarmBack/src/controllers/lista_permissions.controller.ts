import {request, Request, Response} from 'express';


export class PermslistController {
    
    getlistPerms = async (req: Request, res: Response): Promise<Response> => {
        let out = {status:"Ok si fue satisfactorio, Error si ocurrio un error", data:""}
        return res.send(out);
    }


}