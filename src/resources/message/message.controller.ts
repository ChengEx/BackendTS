import { Router, Request, Response, NextFunction } from 'express';
import IController from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exception/http.exception';
import MessageService from '../message/message.service';

class MessageController implements IController {
    public path = '/message';
    public router = Router();
    private messageService = new MessageService(); 
    constructor() {
        this.initialseRoutes();
    }
    private initialseRoutes(): void {
        this.router.post(
            `${this.path}/getChatRoomById`,
            this.getChatRoomById
        )
        this.router.post(
            `${this.path}/addChatRoom`,
            this.addChatRoom
        )
        // this.router.post(
        //     `${this.path}/getMessgeByRoomId`,

        // );
        this.router.post(
            `${this.path}/addMessageByRoomId`,
            this.addMessageByRoomId
        );
        
    }
    private getChatRoomById = async(req:Request, res:Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { _id } = req.body;
            const returnObj = await this.messageService.getChatRoomById(_id);
            res.status(200).json({returnObj});
        }catch(error: any) {
            next(new HttpException(400, error.message));
        }  
    }
    private addChatRoom = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { user1Id, user2Id, productId } = req.body;
            console.log(req.body)
            const returnObj = await this.messageService.addChatRoom(user1Id, user2Id, productId);
            res.status(200).json({returnObj});
        }catch(error: any) {
            next(new HttpException(400, error.message));
        }
    }


    // private getMessgeByRoomId = async(req: Request, res: Response, next: NextFunction): Promise<Response | Error> => {
    //     const { _id } = req.body;

    // }
    private addMessageByRoomId = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { _id, userId, content, time } = req.body;
            const returnObj = await this.messageService.addMessageByRoomId(_id, userId, content, time);
            res.status(200).json({returnObj})
        }catch(error: any) {
            next(new HttpException(400, error.message));
        } 
    }
}
export default MessageController;