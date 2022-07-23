import mongoose, { Schema } from 'mongoose';
import IStudent from './student.interface';

const StudentSchema:Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email:{ type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String},
    photo: {type: String},
    shippingAddredd:{
        city:{ type: String },
        street:{ type: String }
    },
    authority: { type: String, required: true },
    productId: [
        {
            type: mongoose.Types.ObjectId,
            ref: "products"
        }
    ],
    collectionProductId: [
        {
            type: mongoose.Types.ObjectId,
            ref: "products"
        }
    ]
    
},
    { timestamps: true }
)

export default mongoose.model<IStudent>('students',StudentSchema);