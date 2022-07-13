import { Document } from 'mongoose';

export default interface IProduct extends Document{
    name: string,
    category: string,
    productDetail:{
        images:[string],
        description: string,
        price: number,
        status: string,
    }
}