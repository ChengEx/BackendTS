import mongoose, { Schema } from 'mongoose';
import IChatroom from './chatroom.interface';

const ChatroomSchema: Schema = new Schema({
    user1Id: {
        type: mongoose.Types.ObjectId,
        ref: "students"
    },
    user2Id: {
        type: mongoose.Types.ObjectId,
        ref: "students"
    },
},
    {timestamps: true}
)

export default mongoose.model<IChatroom>('chatrooms', ChatroomSchema);