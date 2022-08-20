import OrderModel from "../../resources/order/order.model";

class OrderService {
    private orderModel = OrderModel;

    public async getPersonalOrder(
        userId: string
    ): Promise<object | Error> {
        try {
            const getOrderList = await this.orderModel.find({ buyer: userId }).populate('buyerId').populate('sellerId').populate('productId');
            return getOrderList;
        }catch(error: any) {
            return new Error(error.message);
        }
    }

    public async getShopOrder(
        userId: string
    ): Promise<object | Error> {
        try {
            const getShopOrderList = await this.orderModel.find({ seller: userId }).populate('buyerId').populate('sellerId').populate('productId');
            return getShopOrderList;
        }catch(error: any) {
            return new Error(error.message);
        }
    }

    public async addOrder(
        buyerId: string,
        sellerId: string,
        productId: string
    ): Promise<object | Error> {
        try {
            const returnAddOrder = await this.orderModel.create({
                buyerId,
                sellerId,
                productId,
                status: "運送中"
            });
            console.log(returnAddOrder);
            return returnAddOrder;
        }catch(error: any) {
            return new Error(error.message);
        }
    }
}
export default OrderService;