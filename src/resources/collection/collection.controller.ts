import { Router, Request, Response, NextFunction } from 'express';
import IController from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exception/http.exception';
import CollectionService from '../collection/collection.service';
import StudentService from '../student/student.service';

class CollectionController implements IController {
    public path = '/collection';
    public router = Router();
    private collectionService = new CollectionService();
    private studentService = new StudentService();
    constructor() {
        this.initialseRoutes();
    }
    private initialseRoutes(): void {
        this.router.post(
            `${this.path}/addCollection`,
            this.addCollection
        );
        this.router.post(
            `${this.path}/getCollectionById`,
            this.getCollectionById
        );
        this.router.post(
            `${this.path}/deleteCollection`,
            this.deleteCollection
        )
    }
    private getCollectionById = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { userId } = req.body;
            const returnObj = await this.studentService.getCollectionById(userId);
            res.status(200).json({ returnObj });
        }catch(error: any) {
            next(new HttpException(400, error.message));
        }
    }
    private addCollection = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { productId, userId } = req.body;
            const returnObj = await this.collectionService.addCollection(productId, userId);
            res.status(200).json({ returnObj });
        }
        catch(error: any){
            next(new HttpException(400, error.message));
        }
    }
    private deleteCollection = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { productId, userId } = req.body;
            const returnObj = await this.collectionService.deleteCollection(productId, userId);
            res.status(200).json({ returnObj });
        }catch(error: any){
            next(new HttpException(400, error.message));
        }
    }
}

export default CollectionController;