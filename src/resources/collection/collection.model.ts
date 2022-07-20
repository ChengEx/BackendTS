import mongoose, { Schema } from 'mongoose';
import ICollection from './collection.interface';

const CollectionSchema: Schema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true},
    productId: { 
        type: mongoose.Types.ObjectId,
        ref: "products"
    }
},
    { timestamps: true }
)

export default mongoose.model<ICollection>('collections', CollectionSchema);