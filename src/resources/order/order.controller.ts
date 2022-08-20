import { Router, Request, Response, NextFunction } from 'express';
import IController from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exception/http.exception';
import OrderService from './order.service';

class OrderController implements IController {
    public path = '/order';
    public router = Router();
    private orderService = new OrderService();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/getPersonalOrder`,
            this.getPersonalOrder
        );
        this.router.post(
            `${this.path}/getShopOrder`,
            this.getShopOrder
        );
        this.router.post(
            `${this.path}/addOrder`,
            this.addOrder
        );
        
    }

    private getPersonalOrder = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { userId } = req.body;
            const returnObj = await this.orderService.getPersonalOrder(userId);
            res.status(200).json({returnObj});
        }catch(error: any) {
            next(new HttpException(400, error.message));
        }
    }
    private getShopOrder = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { userId } = req.body;
            const returnObj = await this.orderService.getShopOrder(userId);
            res.status(200).json({returnObj});
        }catch(error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private addOrder = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { buyerId, sellerId, productId } = req.body;
            
            const returnObj = await this.orderService.addOrder(buyerId, sellerId, productId);
            res.status(200).json({returnObj});
        }catch(error: any) {
            next(new HttpException(400, error.message));
        }
    }
}

export default OrderController;