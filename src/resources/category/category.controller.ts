import { Router, Request, Response, NextFunction } from 'express';
import IController from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exception/http.exception';
import categoryService from './category.service';

class CategoryController implements IController {
    public path = '/category';
    public router = Router();
    private categoryService = new categoryService();
    constructor() {
        this.initialseRoutes();
    }
    private initialseRoutes(): void {
        this.router.get(
            `${this.path}/getAllCategory`,
            this.getAllCategory
        );
        this.router.post(
            `${this.path}/getCategoryByPath`,
            this.getCategoryByPath
        )
    }
    private getAllCategory = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> =>{
        try {
            const categoryObj = await this.categoryService.getAllCategory();
            res.status(200).json({ categoryObj });
        }catch(error: any){
            next(new HttpException(400, error.message));
        }
    }
    private getCategoryByPath = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { path } = req.body;
            const categoryObj = await this.categoryService.getCategoryByPath(path);
            res.status(200).json({ categoryObj });
        }catch(error: any){
            next(new HttpException(400, error.message));
        }
    }
}

export default CategoryController;