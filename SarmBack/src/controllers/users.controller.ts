import {request, Request, Response} from 'express';


export class UsersController {
    getUsers = async (req: Request, res: Response): Promise<Response> => {
        console.log("Obteniendo desde usuarios")
        console.log(req.body)
        console.log(req.body.param1)
        return res.send(req.session);
    }
}