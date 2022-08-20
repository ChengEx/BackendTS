import { Document } from 'mongoose';

export default interface IOrder extends Document {
    buyer: string,
    seller: string,
    productId: string,
    status: string
}