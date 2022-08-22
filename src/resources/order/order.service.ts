import OrderModel from "../../resources/order/order.model";
import CollectionModel from "../collection/collection.model";
import StudentModel from "../student/student.model";

class OrderService {
    private orderModel = OrderModel;
    private collectionModel = CollectionModel;
    private studentModel = StudentModel;
    public async getPersonalOrder(
        userId: string
    ): Promise<object | Error> {
        try {
            const getOrderList = await this.orderModel.find({ buyerId: userId }).populate('buyerId').populate('sellerId').populate('productId');
            return getOrderList;
        }catch(error: any) {
            return new Error(error.message);
        }
    }

    public async getShopOrder(
        userId: string
    ): Promise<object | Error> {
        try {
            const getShopOrderList = await this.orderModel.find({ sellerId: userId }).populate('buyerId').populate('sellerId').populate('productId');
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
            console.log(buyerId, productId)
            const returnAddOrder = await this.orderModel.create({
                buyerId,
                sellerId,
                productId,
                status: "處理中"
            });
            const collectionId = await this.collectionModel.findOne({
                userId: buyerId,
                productId: productId
            });
            
            if(collectionId!= null){
                await this.collectionModel.findOneAndDelete({ userId: buyerId, productId: productId});
                await this.studentModel.updateOne({ _id: buyerId },
                {
                    $pull:{
                        collectionProductId:{
                            $in: [ productId ] 
                        }
                    }
                });
                await this.studentModel.updateOne({ _id: sellerId },
                {
                    $pull:{
                        ProductId:{
                            $in: [ productId ] 
                        }
                    }
                });
            }
            return returnAddOrder;
        }catch(error: any) {
            return new Error(error.message);
        }
    }

    public async updateOrderStatus(
        orderId: string,
        newStatus: string
    ): Promise<object | Error> {
        try {
            const updateOrderStatus = await this.orderModel.updateOne({ _id: orderId},
            {
                $set: { status: newStatus }
            });
            return updateOrderStatus;
        }catch(error: any) {
            return new Error(error.message);
        }
    }

}
export default OrderService;