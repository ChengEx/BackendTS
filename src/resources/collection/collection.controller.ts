import { Router, Request, Response, NextFunction } from 'express';
import IController from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exception/http.exception';
import collectionService from '../collection/collection.service';

class CollectionController implements IController {
    public path = '/collection';
    public router = Router();
    private collectionService = new collectionService();
    constructor() {
        this.initialseRoutes();
    }
    private initialseRoutes(): void {
        this.router.post(
            `${this.path}/addCollection`,
            this.addCollection
        )
    }
    private addCollection = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            console.log(req.body);
            const { productId, userId } = req.body;
            const returnObj = await this.collectionService.addCollection(productId, userId);
            res.status(200).json({ returnObj });
        }
        catch(error: any){
            next(new HttpException(400, error.message));
        }
        
    }
}

export default CollectionController;