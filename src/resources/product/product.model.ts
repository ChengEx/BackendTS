import mongoose, { Schema } from 'mongoose';
import IProduct from './product.interface';

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    productDetail:{
        images: [ 
            {
                type: String
            }
        ],
        description: { type: String, required: true },
        price: { type: Number, required: true },
       
    },
    createdBy: { 
        type: mongoose.Types.ObjectId,
        ref: "students"
    },
    status: { type: Boolean, required: true }
    // productId: [
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: "products"
    //     }
    // ],
},
    { timestamps: true }
)

export default mongoose.model<IProduct>('products',ProductSchema);



