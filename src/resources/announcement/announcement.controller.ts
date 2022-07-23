import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '../../utils/exception/http.exception';
import IContoller from '../../utils/interfaces/controller.interface';
import AnnouncementService from './announcement.service';

class AnnouncementController implements IContoller{
    public path = '/announcement';
    public router = Router();
    private announcementService = new AnnouncementService();
    constructor(){
        this.initialseRoutes();
    }
    private initialseRoutes(): void {
        this.router.get(
            `${this.path}/getAll`,
            this.getAll
        );
        this.router.post(
            `${this.path}/addAnnouncement`,
            this.addAnnouncement
        )
    }
    private getAll = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try{
            const returnObj = await this.announcementService.getAll();
            res.status(200).json({ returnObj });
        }catch(error: any) {
            next(new HttpException(400, error.message));
        }
    }
    private addAnnouncement = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { userId, title, content } = req.body;
            const returnObj = await this.announcementService.addAnnouncement(
                userId,
                title,
                content
            )
            res.status(200).json({ returnObj });
        }catch(error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default AnnouncementController;