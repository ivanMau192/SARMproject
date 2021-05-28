import {request, Request, Response} from 'express';


export class ProfilesController {
    
    getProfiles = async (req: Request, res: Response): Promise<Response> => {
        return res.send("OK");
    }

}