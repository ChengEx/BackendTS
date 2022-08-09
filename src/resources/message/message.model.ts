import mongoose, { Schema } from 'mongoose';
import IMessage from './message.interface';

const MessageSchema: Schema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "students"
    },
    message: {
        type: String,
        required: true
    }   
},
    { timestamps: true }
)

export default mongoose.model<IMessage>('messages',MessageSchema);



