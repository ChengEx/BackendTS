import mongoose, { Schema } from 'mongoose';
import IOrder from './order.interface';

const OrderSchema: Schema = new Schema({
    buyerId: {
        type: mongoose.Types.ObjectId,
        ref: "students"
    },
    sellerId: {
        type: mongoose.Types.ObjectId,
        ref: "students"
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "products"
    },
    status: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

export default mongoose.model<IOrder>('orders', OrderSchema);