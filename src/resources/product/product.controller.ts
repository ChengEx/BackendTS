import { Router, Request, Response, NextFunction } from "express";
import IController from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exception/http.exception';
import ProductService from './product.service';

class ProductController implements IController {
    public path = "/product";
    public router = Router();
    private productService = new ProductService();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}/allproduct`,
            this.getProduct
        );
        this.router.post(
            `${this.path}/addproduct`,
            this.addProduct
        );
        this.router.post(
            `${this.path}/getProductListByCategory`,
            this.getProductListByCategory
        )
        this.router.post(
            `${this.path}/getProductListBySubCategory`,
            this.getProductListBySubCategory
        );
        this.router.post(
            `${this.path}/getProductById`,
            this.getProductById,
        );
        this.router.post(
            `${this.path}/getProductListByUserId`,
            this.getProductListByUserId
        );
        this.router.post(
            `${this.path}/updateProductById`,
            this.updateProductById
        );
        this.router.post(
            `${this.path}/deleteProductById`,
            this.deleteProductById
        )
    }
    private getProduct = async(req: Request, res: Response, next: NextFunction):Promise<Response | void> =>{
        try {
            const productArray = await this.productService.getAllProduct();
            res.status(200).json({ productArray });
        }catch(error: any){
            next(new HttpException(400, error.message));
        }
    }

    private addProduct = async(req: Request, res: Response, next:NextFunction): Promise<Response | void> => {
        try {
            const { _id, name, category, subcategory, images, description, price, status } = req.body;
            const addProductObj = await this.productService.addProduct(
                _id,
                name,
                category,
                subcategory,
                images,
                description,
                price,
                status
            )
            //console.log("res",addProductObj);
            res.status(200).json({ addProductObj });
        }catch(error: any){
            next(new HttpException(400, error.message));
        }
    }
    private getProductListByCategory = async(req:Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { category } = req.body;
            const returnObjList = await this.productService.getProductListByCategory(category);
            res.status(200).json({ returnObjList });
        }catch(error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private getProductListBySubCategory = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { category, subcategory } = req.body;
            //console.log(req.body);
            const returnObjList = await this.productService.getProductListBySubCategory(category, subcategory);
            res.status(200).json({ returnObjList });
        }catch(error: any) {
            next(new HttpException(400,error.message));
        }
    }
    private getProductById = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { _id } = req.body;
            const productObj = await this.productService.getProductById(_id);
            res.status(200).json({ productObj });
        }catch(error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private getProductListByUserId = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            //console.log(req.body);
            const { _id } = req.body;
            const getProductList = await this.productService.getProductListByUserId(_id);
            res.status(200).json({ getProductList });
        }catch(error: any) {
            next(new HttpException(400, error.message));
        }
        
    }

    private updateProductById = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { _id, name, category, subcategory, images, description, price, status } = req.body;
            const returnObj = await this.productService.updateProductById(
                _id,
                name,
                category,
                subcategory,
                images,
                description,
                price,
                status
            )
            res.status(200).json({ returnObj });
        }catch(error: any) {
            next(new HttpException(400,error.message));
        }
    }
    private deleteProductById = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { _id, userId } = req.body;
            const returnObj = await this.productService.deleteProductById(_id, userId);
            const getProductList = await this.productService.getProductListByUserId(userId);
            res.status(200).json({ getProductList });
        }catch(error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default ProductController;