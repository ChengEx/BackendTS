import mongoose, { Schema } from 'mongoose';
import IMessage from './message.interface';

const MessageSchema: Schema = new Schema({
    message: {
        type: String,
        required: true
    },
    otherStudents: {
        type: Array
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
        required: true,
    }
},
    { timestamps: true }
)

export default mongoose.model<IMessage>('products',MessageSchema);



